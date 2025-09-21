import { lucid } from "./wallet";

export const lockEscrow = async (
  senderAddr: string,
  receiverAddr: string,
  amount: bigint
) => {
  const tx = await lucid.newTx()
    .payToAddress(receiverAddr, { lovelace: amount })
    .complete();

  const txHash = await tx.sign().submit();
  return txHash;
};

export const approveEscrow = async (txHash: string) => {
  // For demo, assume tx already signed & just record approval
  console.log("Escrow approved:", txHash);
};

export const rejectEscrow = async (txHash: string) => {
  // Refund logic
  console.log("Escrow rejected:", txHash);
};
