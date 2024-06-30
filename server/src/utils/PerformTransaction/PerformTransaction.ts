import { db } from "../../config/database";


export const performTransaction = async (operations: Function[]) => {
  const transaction = await db.transaction();

  try {
    for (const operation of operations) {
      await operation(transaction);
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Transaction failed: ${error}`);
  }
};
