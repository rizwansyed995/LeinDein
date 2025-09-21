import { Lucid, Blockfrost } from "lucid-cardano";
import fs from "fs";
import path from "path";

const API_KEY = process.env.BLOCKFROST_API_KEY || "";
export let lucid: Lucid;

export const initLucid = async () => {
  const blockfrost = new Blockfrost(API_KEY, "Preprod");
  lucid = await Lucid.new(blockfrost, "Preprod");

  const skeyPath = path.join(__dirname, "wallet.skey");
  if (fs.existsSync(skeyPath)) {
    const skey = fs.readFileSync(skeyPath, "utf-8");
    lucid.selectWalletFromPrivateKey(skey);
  }

  console.log("Lucid initialized with test wallet");
};

export const sendTx = async (receiver: string, amount: bigint) => {
  if (!lucid) throw new Error("Lucid not initialized");

  const txComplete = await lucid.newTx()
    .payToAddress(receiver, { lovelace: amount })
    .complete();

  const txSigned = await txComplete.sign().complete();
  const txHash = await txSigned.submit();
  console.log("Transaction submitted:", txHash);
  return txHash;
};
