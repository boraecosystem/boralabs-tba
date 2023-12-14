import axios from 'axios';
import { Contract, ethers } from 'ethers';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { setupAccount } from '@/setups/account.composition';
import { useAccountStore } from '@/stores/account.module.ts';
import { useAssetStore } from '@/stores/asset.module.ts';
import { useModalStore } from '@/stores/modal.module';
import MetamaskService from '@/services/metamask.service';
import { IERC1155, IERC20, IERC721, IREG, ITBA } from '@/constant/abi';
import type { Erc6551Asset, ErcAsset, Metadata, Metadata6551, Asset } from '@/types/asset';

export const setupAsset = () => {
  const assetStore = useAssetStore();
  const accountStore = useAccountStore();
  const modalStore = useModalStore();
  const { isSigned } = storeToRefs(accountStore);
  const { setAsset721, setAsset1155, setAsset6551, setTba20, setIsAssetLoading } = assetStore;
  const {
    hasAsset,
    addAsset,
    detail1155Asset,
    tbaMintStep,
    toAddress,
    toAmounts,
    from6551,
    tbaAsset1155,
    tbaAsset20,
    detail721Asset,
    tbaAsset721
  } = storeToRefs(assetStore);

  const { sendLoadingModalRef, addLoadingModalRef, radialModalRef, progressTime, stepModalRef } =
    storeToRefs(modalStore);

  const { setShowToast, setToastMsg } = modalStore;
  const { connectWallet } = setupAccount();

  const assetOwner = ref<string>('');

  /**
   * Basic wallet setting procedure to proceed with TBA Project
   */
  const createWallet = async () => {
    if (isSigned.value) {
      stepModalRef.value?.showModal();
      await tbaMint();
      stepModalRef.value?.close();
    } else if (!isSigned.value) {
      await connectWallet();
      await checkAsset();
      if (!hasAsset.value) {
        stepModalRef.value?.showModal();
        await tbaMint();
        stepModalRef.value?.close();
      }
    }
  };

  /**
   * Basic asset payment procedure to proceed with TBA Project
   */
  const tbaMint = async () => {
    const wallet = new MetamaskService();
    await wallet.init();
    const address = await wallet.getAddress();
    const provider = await wallet.getWeb3Provider();
    const signer = await provider.getSigner();

    const tkn = new Contract(import.meta.env.VITE_BORALABS_TKN_CONTRACT, IERC20, signer);
    const nft = new Contract(import.meta.env.VITE_BORALABS_NFT_CONTRACT, IERC721, signer);
    const mts = new Contract(import.meta.env.VITE_BORALABS_MTS_CONTRACT, IERC1155, signer);
    const reg = new Contract(import.meta.env.VITE_BORALABS_TREG_CONTRACT, IREG, signer);

    try {
      // Mint ERC721 NFT
      const tx = await nft.tbaMint(address);

      const txResponse = await provider.getTransaction(tx.hash);
      txResponse && (await txResponse.wait());
      tbaMintStep.value = 2;

      // Convert ERC721 to ERC6551
      const tokensOf721 = await nft.tokensOf(address);
      await convert721to6551(tokensOf721[0], true);
      tbaMintStep.value = 3;

      const walletAddress = await reg.account(
        import.meta.env.VITE_BORALABS_TACC_CONTRACT,
        Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
        import.meta.env.VITE_BORALABS_NFT_CONTRACT,
        tokensOf721[0],
        0n
      );

      // Mint ERC20 to ERC6551 NFT
      const txErc20 = await tkn.mint(walletAddress, 100000000000000000000n);
      const txErc20Response = await provider.getTransaction(txErc20.hash);
      txErc20Response && (await txErc20Response.wait());
      tbaMintStep.value = 4;
    } catch (e) {
      console.error(e);
      return;
    }

    try {
      // Mint ERC1155
      const tx = await mts.tbaMint(address, 5, '0x');
      const txResponse = await provider.getTransaction(tx.hash);
      txResponse && (await txResponse.wait());
    } catch (e) {
      console.error(e);
      return;
    }

    await checkAsset();
  };

  /**
   * Verify that your current wallet has ownership of the asset
   * @param id
   * @param ercType
   * @returns
   */

  const checkOwner = async (id: bigint | undefined, ercType: number) => {
    const wallet = new MetamaskService();
    await wallet.init();
    const address = await wallet.getAddress();
    const provider = await wallet.getWeb3Provider();
    const signer = await provider.getSigner();

    try {
      if (ercType === 721 || ercType === 6551) {
        const nft = new Contract(import.meta.env.VITE_BORALABS_NFT_CONTRACT, IERC721, signer);

        const ownerAddress = await nft.ownerOf(id);

        return address === ownerAddress;
      } else if (ercType === 1155) {
        const mts = new Contract(import.meta.env.VITE_BORALABS_MTS_CONTRACT, IERC1155, signer);
        const tokensOf1155 = await mts.tokensOf(address);

        return tokensOf1155[0].includes(id);
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  /**
   * Checks the ERC721 assets owned by a given address.
   * @param address
   * @returns
   */
  const check721Asset = async (address: string) => {
    const wallet = new MetamaskService();
    await wallet.init();

    const provider = await wallet.getWeb3Provider();
    const signer = await provider.getSigner();

    const nft = new Contract(import.meta.env.VITE_BORALABS_NFT_CONTRACT, IERC721, signer);
    const reg = new Contract(import.meta.env.VITE_BORALABS_TREG_CONTRACT, IREG, signer);

    const tokensOf721: bigint[] = await nft.tokensOf(address);

    const asset721: ErcAsset = new Map();
    const asset6551: Erc6551Asset = new Map();

    const is6551List = await Promise.all(
      tokensOf721.map(async (tokenId: bigint) => {
        const is6551 = await reg.accountsOf(import.meta.env.VITE_BORALABS_NFT_CONTRACT, tokenId);
        return is6551.length !== 0;
      })
    );

    const nftList = tokensOf721.filter((_: bigint, index: number) => !is6551List[index]);

    const asset721Data = await Promise.all(
      nftList.map(async (tokenId: bigint) => {
        const uri = await nft.tokenURI(tokenId);
        const metadata = await axios.get(uri);
        return { tokenId, metadata: metadata.data };
      })
    );

    asset721Data.forEach((asset) => {
      asset721.set(asset.tokenId, { metadata: { ...asset.metadata, type: 721 } });
    });

    const asset6551List = tokensOf721.filter((_, index: number) => is6551List[index]);

    const asset6551Data = await Promise.all(
      asset6551List.map(async (tokenId: bigint) => {
        const uri = await nft.tokenURI(tokenId);
        const walletAddress = await reg.account(
          import.meta.env.VITE_BORALABS_TACC_CONTRACT,
          Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
          import.meta.env.VITE_BORALABS_NFT_CONTRACT,
          tokenId,
          0n
        );
        const apiReponse = await axios.get(uri);
        const metadata: Metadata6551 = apiReponse.data;
        return { tokenId, metadata: { ...metadata, walletAddress: walletAddress } };
      })
    );

    asset6551Data.forEach((asset) => {
      asset6551.set(asset.tokenId, { metadata: { ...asset.metadata, type: 6551 } });
    });

    return { asset721, asset6551 };
  };

  /**
   * Checks the ERC1155 assets owned by a given address.
   * @param address
   * @returns
   */
  const check1155Asset = async (address: string) => {
    const wallet = new MetamaskService();
    await wallet.init();

    const provider = await wallet.getWeb3Provider();
    const signer = await provider.getSigner();

    const mts = new Contract(import.meta.env.VITE_BORALABS_MTS_CONTRACT, IERC1155, signer);
    const tokensOf1155: [bigint[], bigint[]] = await mts.tokensOf(address);

    const asset1155: ErcAsset = new Map();

    const mtsList = tokensOf1155;

    const asset1155Data = await Promise.all(
      mtsList[0].map(async (tokenId: bigint, i: number) => {
        const uri = await mts.uri(tokenId);
        const metadata: Metadata = await (await axios.get(uri)).data;
        return { tokenId, metadata: metadata, amount: mtsList[1][i] };
      })
    );

    asset1155Data.forEach((asset) => {
      asset1155.set(asset.tokenId, {
        metadata: { ...asset.metadata, type: 1155 },
        amount: asset.amount
      });
    });

    return { asset1155 };
  };

  /**
   * View TBA Project-related assets currently owned by the connected wallet.
   */
  const checkAsset = async () => {
    setIsAssetLoading(true);
    const wallet = new MetamaskService();
    await wallet.init();
    const address = await wallet.getAddress();

    const result = await Promise.all([check721Asset(address), check1155Asset(address)]);

    const asset721 = result[0]['asset721'];
    const asset6551 = result[0]['asset6551'];
    const asset1155 = result[1]['asset1155'];

    setAsset721(asset721);
    setAsset1155(asset1155);
    setAsset6551(asset6551);

    const isAssetEmpty = asset721.size + asset1155.size + asset6551.size === 0;

    if (isAssetEmpty) await new Promise((resolve) => setTimeout(resolve, 800));

    setIsAssetLoading(false);
  };

  const send20Token = async (upperModalRef: HTMLDialogElement) => {
    const wallet = new MetamaskService();
    await wallet.init();
    const provider = await wallet.getWeb3Provider();
    const signer = await provider.getSigner();

    const reg = new Contract(import.meta.env.VITE_BORALABS_TREG_CONTRACT, IREG, signer);
    const tkn = new Contract(import.meta.env.VITE_BORALABS_TKN_CONTRACT, IERC20, signer);

    const tbaAddress = await reg.account(
      import.meta.env.VITE_BORALABS_TACC_CONTRACT,
      Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
      import.meta.env.VITE_BORALABS_NFT_CONTRACT,
      from6551.value?.tokenId,
      0n
    );

    const encodedFn = tkn.interface.encodeFunctionData('transfer', [
      toAddress.value,
      ethers.parseEther(toAmounts.value)
    ]);

    const proxy6551 = new Contract(tbaAddress, ITBA, signer);

    const tx = await proxy6551.execute(
      import.meta.env.VITE_BORALABS_TKN_CONTRACT,
      0n,
      encodedFn,
      0n
    );

    upperModalRef.close();

    sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal();

    progressTime.value = 0;
    const progressInterval = setInterval(
      () =>
        (progressTime.value =
          progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
      10
    );

    await waitTransaction(provider, tx);

    progressTime.value = 100;
    clearInterval(progressInterval);
    sendLoadingModalRef.value && sendLoadingModalRef?.value.close();

    const tknAmountWei = await tkn.balanceOf(tbaAddress);
    const tknSymbol = await tkn.symbol();
    const tknDecimals = await tkn.decimals();
    const formatEtherAmount = ethers.formatEther(tknAmountWei);

    setTba20([{ tknAmountWei, tknSymbol, tknDecimals, formatEtherAmount }]);

    await checkAsset();

    setShowToast(true);
    setToastMsg('Send Completed!');
  };

  const sendNft = async (toAddress: string, asset: Asset, upperModalRef: any) => {
    const assetType = asset[1].metadata.type;

    const wallet = new MetamaskService();
    await wallet.init();
    const provider = await wallet.getWeb3Provider();
    const address = await wallet.getAddress();
    const signer = await provider.getSigner();

    if (assetType === 721 || assetType === 6551) {
      const nft = new Contract(import.meta.env.VITE_BORALABS_NFT_CONTRACT, IERC721, signer);

      const tx = await nft.transferFrom(address, toAddress, asset[0]);
      upperModalRef.value.close();

      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal();

      progressTime.value = 0;
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      );

      await waitTransaction(provider, tx);

      progressTime.value = 100;
      clearInterval(progressInterval);
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close();

      const uri = await nft.tokenURI(BigInt(asset[0]));
      const metadata = await axios.get(uri);

      detail721Asset.value.set(asset[0], { metadata: { ...metadata.data, type: 721 } });
    }

    if (assetType === 1155) {
      const mts = new Contract(import.meta.env.VITE_BORALABS_MTS_CONTRACT, IERC1155, signer);

      const tx = await mts.safeTransferFrom(
        address,
        toAddress,
        asset[0],
        BigInt(toAmounts.value),
        '0x'
      );
      upperModalRef.value.close();
      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal();

      progressTime.value = 0;
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      );

      await waitTransaction(provider, tx);

      progressTime.value = 100;
      clearInterval(progressInterval);
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close();

      const uri = await mts.uri(BigInt(asset[0]));
      const metadata = await axios.get(uri);
      const amount = await mts.balanceOf(signer.getAddress(), asset[0]);

      detail1155Asset.value.set(asset[0], {
        metadata: { ...metadata.data, type: 1155 },
        amount
      });
    }
    await checkAsset();

    setShowToast(true);
    setToastMsg('Send Completed!');
  };

  /**
   * Function to send ERC721 NFT included in ERC6551
   * @param asset
   * @param upperModalRef
   */
  const sendNftFrom6551 = async (asset: Asset, upperModalRef: any) => {
    const assetType = asset[1].metadata.type;

    const wallet = new MetamaskService();
    await wallet.init();
    const provider = await wallet.getWeb3Provider();
    const signer = await provider.getSigner();

    // Make Smart Contract Instance
    const nft = new Contract(import.meta.env.VITE_BORALABS_NFT_CONTRACT, IERC721, signer);
    const reg = new Contract(import.meta.env.VITE_BORALABS_TREG_CONTRACT, IREG, signer);
    const mts = new Contract(import.meta.env.VITE_BORALABS_MTS_CONTRACT, IERC1155, signer);
    const tkn = new Contract(import.meta.env.VITE_BORALABS_TKN_CONTRACT, IERC20, signer);

    const tbaAddress = await reg.account(
      import.meta.env.VITE_BORALABS_TACC_CONTRACT,
      Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
      import.meta.env.VITE_BORALABS_NFT_CONTRACT,
      from6551.value?.tokenId,
      0n
    );

    if (assetType === 721 || assetType === 6551) {
      const encodedFn = nft.interface.encodeFunctionData('transferFrom', [
        tbaAddress,
        toAddress.value,
        asset[0]
      ]);

      const proxy6551 = new Contract(tbaAddress, ITBA, signer);

      const tx = await proxy6551.execute(
        import.meta.env.VITE_BORALABS_NFT_CONTRACT,
        0n,
        encodedFn,
        0n
      );

      upperModalRef.value.close();

      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal();

      progressTime.value = 0;
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      );

      await waitTransaction(provider, tx);

      progressTime.value = 100;
      clearInterval(progressInterval);
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close();

      const uri = await nft.tokenURI(BigInt(asset[0]));
      const metadata = await axios.get(uri);

      detail721Asset.value.set(asset[0], { metadata: { ...metadata.data, type: 721 } });
    }

    if (assetType === 1155) {
      const encodedFn = mts.interface.encodeFunctionData('safeTransferFrom', [
        tbaAddress,
        toAddress.value,
        asset[0],
        BigInt(toAmounts.value),
        '0x'
      ]);

      const proxy6551 = new Contract(tbaAddress, ITBA, signer);

      const tx = await proxy6551.execute(
        import.meta.env.VITE_BORALABS_MTS_CONTRACT,
        0n,
        encodedFn,
        0n
      );

      upperModalRef.value.close();
      sendLoadingModalRef.value && sendLoadingModalRef?.value.showModal();

      progressTime.value = 0;
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      );

      await waitTransaction(provider, tx);

      progressTime.value = 100;
      clearInterval(progressInterval);
      sendLoadingModalRef.value && sendLoadingModalRef?.value.close();

      const uri = await mts.uri(BigInt(asset[0]));
      const metadata = await axios.get(uri);
      const amount = await mts.balanceOf(signer.getAddress(), asset[0]);

      detail1155Asset.value.set(asset[0], {
        metadata: { ...metadata.data, type: 1155 },
        amount
      });
    }

    const tknAmountWei = await tkn.balanceOf(tbaAddress);
    const tknSymbol = await tkn.symbol();
    const tknDecimals = await tkn.decimals();
    const formatEtherAmount = ethers.formatEther(tknAmountWei);

    const result = await Promise.all([check721Asset(tbaAddress), check1155Asset(tbaAddress)]);

    const asset721 = result[0]['asset721'];
    const asset1155 = result[1]['asset1155'];

    setTba20([{ tknAmountWei, tknSymbol, tknDecimals, formatEtherAmount }]);
    tbaAsset721.value = asset721;
    tbaAsset1155.value = asset1155;

    await checkAsset();

    setShowToast(true);
    setToastMsg('Send Completed!');
  };

  const addNft = async (toAddress: string, upperModalRef: any) => {
    const wallet = new MetamaskService();
    await wallet.init();
    const provider = await wallet.getWeb3Provider();
    const address = await wallet.getAddress();
    const signer = await provider.getSigner();

    const assetIdList: bigint[] = [];
    const assetAmountsList: bigint[] = [];

    addAsset.value.forEach((value, key: bigint) => {
      assetIdList.push(key), assetAmountsList.push(value.amount!);
    });

    const mts = new Contract(import.meta.env.VITE_BORALABS_MTS_CONTRACT, IERC1155, signer);

    const tx = await mts.safeBatchTransferFrom(
      address,
      toAddress,
      assetIdList,
      assetAmountsList,
      '0x'
    );
    upperModalRef.value.close();
    addLoadingModalRef.value && addLoadingModalRef?.value.showModal();

    progressTime.value = 0;
    const progressInterval = setInterval(
      () =>
        (progressTime.value =
          progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
      10
    );

    await waitTransaction(provider, tx);

    progressTime.value = 100;
    clearInterval(progressInterval);
    addLoadingModalRef.value && addLoadingModalRef?.value.close();

    await checkAsset();

    setShowToast(true);
    setToastMsg('Add Completed!');
  };

  /**
   * This function creates the Token Bound Account for an NFT given an implementation address.
   * @param nft721Id
   * @param isTbaMint
   * @returns
   */
  const convert721to6551 = async (nft721Id: bigint, isTbaMint?: boolean) => {
    const wallet = new MetamaskService();
    await wallet.init();
    const address = await wallet.getAddress();
    const provider = await wallet.getWeb3Provider();
    const signer = await provider.getSigner();

    const reg = new Contract(import.meta.env.VITE_BORALABS_TREG_CONTRACT, IREG, signer);
    const createTx = await reg.createAccount(
      import.meta.env.VITE_BORALABS_TACC_CONTRACT,
      Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
      import.meta.env.VITE_BORALABS_NFT_CONTRACT,
      Number(nft721Id),
      0n,
      '0x'
    );

    if (!isTbaMint) {
      radialModalRef.value && radialModalRef?.value.showModal();

      progressTime.value = 0;
      const progressInterval = setInterval(
        () =>
          (progressTime.value =
            progressTime.value <= 100 ? progressTime.value + 0.05 : progressTime.value),
        10
      );

      await waitTransaction(provider, createTx);
      progressTime.value = 100;
      clearInterval(progressInterval);
      radialModalRef.value && radialModalRef?.value.close();
      setShowToast(true);
      setToastMsg('Convert Completed!');
      const result = await check721Asset(address);

      setAsset721(result['asset721']);
      setAsset6551(result['asset6551']);
      return;
    }
    await waitTransaction(provider, createTx);

    !isTbaMint && setShowToast(true);
    setToastMsg('Convert Completed!');

    const result = await check721Asset(address);

    setAsset721(result['asset721']);
    setAsset6551(result['asset6551']);

    return;
  };

  const waitTransaction = async (provider: any, tx: any) => {
    const txResponse = await provider.getTransaction(tx.hash);
    txResponse && (await txResponse.wait());

    return;
  };

  const checkDetailAsset = async (ercType: number, tokenId: bigint) => {
    const wallet = new MetamaskService();
    await wallet.init();

    if (ercType === 6551) {
      const wallet = new MetamaskService();
      await wallet.init();
      const provider = await wallet.getWeb3Provider();
      const signer = await provider.getSigner();

      const reg = new Contract(import.meta.env.VITE_BORALABS_TREG_CONTRACT, IREG, signer);
      const nft = new Contract(import.meta.env.VITE_BORALABS_NFT_CONTRACT, IERC721, signer);
      const tkn = new Contract(import.meta.env.VITE_BORALABS_TKN_CONTRACT, IERC20, signer);

      assetOwner.value = await nft.ownerOf(tokenId);
      const tbaAddress = await reg.account(
        import.meta.env.VITE_BORALABS_TACC_CONTRACT,
        Number(import.meta.env.VITE_BORACHAIN_CHAIN_ID),
        import.meta.env.VITE_BORALABS_NFT_CONTRACT,
        tokenId,
        0n
      );

      const tknAmountWei: bigint = await tkn.balanceOf(tbaAddress);
      const tknSymbol: string = await tkn.symbol();
      const tknDecimals: bigint = await tkn.decimals();
      const formatEtherAmount = ethers.formatEther(tknAmountWei);

      const result = await Promise.all([check721Asset(tbaAddress), check1155Asset(tbaAddress)]);

      const asset721 = result[0]['asset721'];
      const asset1155 = result[1]['asset1155'];

      tbaAsset20.value = [{ tknAmountWei, tknSymbol, tknDecimals, formatEtherAmount }];

      tbaAsset721.value = asset721;
      tbaAsset1155.value = asset1155;
    } else if (ercType === 721) {
      const wallet = new MetamaskService();
      await wallet.init();
      const provider = await wallet.getWeb3Provider();
      const signer = await provider.getSigner();

      const nft = new Contract(import.meta.env.VITE_BORALABS_NFT_CONTRACT, IERC721, signer);
      assetOwner.value = await nft.ownerOf(tokenId);
      const uri = await nft.tokenURI(BigInt(tokenId));
      const metadata = await axios.get(uri);

      detail721Asset.value.set(tokenId, { metadata: { ...metadata.data, type: 721 } });
    } else if (ercType === 1155) {
      const wallet = new MetamaskService();
      await wallet.init();
      const provider = await wallet.getWeb3Provider();
      const signer = await provider.getSigner();

      assetOwner.value = await wallet.getAddress();
      const mts = new Contract(import.meta.env.VITE_BORALABS_MTS_CONTRACT, IERC1155, signer);

      const uri = await mts.uri(BigInt(tokenId));
      const metadata = await axios.get(uri);
      const amount = await mts.balanceOf(signer.getAddress(), tokenId);

      detail1155Asset.value.set(tokenId, {
        metadata: { ...metadata.data, type: 1155 },
        amount
      });
    }
  };

  return {
    assetOwner,
    tbaMintStep,
    createWallet,
    convert721to6551,
    tbaMint,
    checkAsset,
    sendNft,
    addNft,
    sendNftFrom6551,
    send20Token,
    check721Asset,
    check1155Asset,
    checkOwner,
    checkDetailAsset,

    detail1155Asset,
    detail721Asset
  };
};
