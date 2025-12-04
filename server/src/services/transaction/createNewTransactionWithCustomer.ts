
import type { TransactionInsertRow } from "../../utils/types.js";
import transactionDao from "../../db/transactionDao/index.js";

const {
    insertTransaction
} = transactionDao

export const createNewTransactionWithCustomer = async (document:TransactionInsertRow) => {
    try {
        const insertValues = document;
        const createdProduct = await insertTransaction(insertValues);
        console.log(">>>service - createNewTransactionWithCustomer insertProduct response", createdProduct);
        return createdProduct;
    } catch(error) {
        console.log(`error at service - createNewTransactionWithCustomer`, error);
        throw new Error('error at service - createNewTransactionWithCustomer' + error );
    }
}