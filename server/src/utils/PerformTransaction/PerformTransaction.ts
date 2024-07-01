import { Transaction } from "sequelize";
import { db } from "../../config/database";


export const performTransaction = async (transaction:Transaction) => {
 
  try {
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Transaction failed: ${error}`);
  }
};
