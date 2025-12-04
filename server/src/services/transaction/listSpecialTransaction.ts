
import type { TransactionViewRow } from "../../utils/types.js";
import transactionDao from "../../db/transactionDao/index.js";

const {
    readSpecialTransaction
} = transactionDao

export const listSpecialTransaction = async (transactionId?:string): Promise<TransactionViewRow[]> => {
    try {
        // expecting no body
        // expecting no queries
        // expecting no params

        // fetch Customer list using readSpecialTransaction from transactionDao
        const listedCustomer = await readSpecialTransaction();
        console.log(">>>service - listSpecialTransaction readSpecialCustomer response", listedCustomer);
        return listedCustomer;
    } catch(error) {
        console.log(`error at service - listSpecialTransaction`, error);
        throw new Error('error at service - listSpecialTransaction' + error );
    }
}