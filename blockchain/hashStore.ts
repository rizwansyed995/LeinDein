import CryptoJS from "crypto-js";

export const generateFileHash = async (fileBuffer: ArrayBuffer) => {
  const wordArray = CryptoJS.lib.WordArray.create(fileBuffer as any);
  return CryptoJS.SHA256(wordArray).toString();
};
