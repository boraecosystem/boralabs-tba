<h1 align="center">Boralabs - TBA Project</h1>
<p align="center">
<img alt="Version Badge" src="https://img.shields.io/badge/version-1.0-teal">
<img alt="Node Badge" src="https://img.shields.io/badge/node-%5E18.17-blue?logo=nodedotjs">
<img alt="Yarn Badge" src="https://img.shields.io/badge/yarn-1.22-blue?logo=yarn">
<img alt="License Badge" src="https://img.shields.io/badge/license-MIT-greenyellow">
<a href="https://medium.com/boraecosystem" target="_blank"><img alt="Medium Badge" src="https://img.shields.io/badge/read_more-gray?logo=medium"></a>
<a href="https://twitter.com/bora_ecosystem" target="_blank"><img alt="Twitter Badge" src="https://img.shields.io/badge/follow-white?logo=x&logoColor=black"></a>
</p>

## Introduction

BORAlabs - TBA Project is an Token Bound Account Standard project. We present a groundbreaking NFT market that
transcends traditional NFT trading by incorporating the ERC-1155 Multi Token Standard. This project introduces a
transformative feature, enabling the transfer of entire wallet (account) ownership through NFT trades. At its core, this
project introduces ERC-6551, Token Bound Accounts (TBA) Standard that are tightly connected to NFTs, allowing the
seamless transfer of all assets within an account during TBA trades. Join us as we explore these concepts, their
real-world applications, and reshape the landscape of blockchain asset ownership and management.

## Table of Contents

0. [Prerequisite](#prerequisite)

1. [Quick Start](#quick-start)

2. [Features](#features)

3. [Examples](#examples)

4. [Licenses](#licenses)

5. [References & Docs](#references---docs)

---

## Prerequisite

### System Requirement

- 🐳 **Docker Desktop** (latest with docker-compose)
- 🥮 **Ganache GUI** [download](https://trufflesuite.com/ganache/)
- 🟩 **Node v18.17** (latest)
- 🐱 **Yarn v1.22.19**
- 🌐 **Chrome Web Browser / with Metamask Extension** 🦊
- 📝 **Visual Studio Code** (Or any text editors of your choice ❤️)
- **git** (latest)
- **WSL 2** (for windows only)

---

## Quick Start

### Visit our 👉 [live demo](https://tba.boralabs.com/)

### Local Environment Setup

**Step 1. Install required packages via Yarn**</br>

```shell
git clone https://github.com/boraecosystem/boralabs-tba
cd ./boralabs-tba
yarn
code . // open your text editor (optional)
```

**NOTE:** current directory is your <project_root_dir>

**Step 2. Open Ganache GUI** </br>

- Refer to 👉 [Ganache Quick Start](https://trufflesuite.com/docs/ganache/quickstart/)
- Open Ganache > Click Quick start
- Get the Private Key for the first account (Use it for Step 3 and import it to your Metamask)
- Import your private key to your Metamask (Latest version of Chrome Recommended)

[How to import a private key to
Metamask](https://support.metamask.io/hc/en-us/articles/360015489331-How-to-import-an-account)

**Step 3. Deploy Contracts** </br>

```shell
cd <project_root_dir>
git clone https://github.com/boraecosystem/boralabs-tba-contract ./chain && cd ./chain
yarn
echo DEPLOYER_KEY=<your_private_key> > .env
yarn hardhat compile
yarn hardhat deploy --network ganache_network --tags TBA // press 'Y' to each deployment prompt
cp .env.export ../.env
```

**NOTE:** <your_private_key> is the private key you got from Ganache GUI (see step 2)

**Also NOTE:** By the end of step 3, you will have a .env file contains chain information and contract addresses in
your <project_root_dir> directory. Check the result with your text editor.

**step 4. Build & Run Application**

```shell
cd <project_root_dir>
docker-compose up -d
```

- open [http://localhost:8080](http://localhost:8080) on Chrome
- Login with Metamask

---

## Features

1. **Mint Various Assets:**
    - Mint NFT(ERC-721), TBA(ERC-6551), MTS(Multi Token Standard, ERC-1155), and regular FT(ERC-20) for testing purpose.
    - Each token type follows the standard specified with it.
2. **Token Conversion:**
    - Convert NFT to TBA seamlessly.
3. **Asset Transfers:**
    - Transfer assets, including NFTs, MTS tokens, and FTs to different addresses both EOA and SCA.
4. **View Assets within TBAs:**
    - Easily view and manage assets within TBAs, enhancing UX and accessibility.
5. **TBA Ownership Transfer:**
    - Facilitate the transfer of TBA ownership, enabling seamless mass transaction of assets with just one transaction.
6. **Bulk Transfer of MTS:**
    - Perform bulk transfers of MTS tokens based on ERC-1155 specifications.

## Examples

- Project main page after creating all assets.

- list all existing assets, and send them to other addresses.

- View all assets in TBA token.

- Transfer assets in TBA token to other addresses.

---

## Licenses

**MIT** License, see [LICENSE](./LICENSE).

---

## References & Docs

- ERC-6551 Protocols: [https://eips.ethereum.org/EIPS/eip-6551](https://eips.ethereum.org/EIPS/eip-6551)
- ERC-1155 Protocols: [https://eips.ethereum.org/EIPS/eip-1155](https://eips.ethereum.org/EIPS/eip-1155)
