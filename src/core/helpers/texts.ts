export const beautifyText = (str: string) => {
  if (!str) return str;
  return (str.charAt(0).toUpperCase() + str.slice(1)).replaceAll('_', ' ');
};

export const truncateFromMiddle = (fullStr: string, frontChars: number, backChars: number, middleStr = '...') => {
  if (fullStr.length <= frontChars) return fullStr;
  return fullStr.slice(0, frontChars) + middleStr + fullStr.slice(fullStr.length - backChars);
};
