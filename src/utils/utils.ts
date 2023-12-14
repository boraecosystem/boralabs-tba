export const truncate = (text: string, num = 6): string => {
  const characters: number = text.length;
  if (characters >= 42) {
    return text.slice(0, num) + '...' + text.substring(characters - num);
  } else {
    return text;
  }
};

export const copy = (ref: string): void => {
  window.navigator.clipboard.writeText(ref);
};

export const isValidAddress = (address: string) => {
  if (/^(0x)[0]{40}$/.test(address)) {
    return false;
  } else if (/^(0x)[0-9a-fA-F]{40}$/.test(address)) {
    return true;
  }
  return false;
};
