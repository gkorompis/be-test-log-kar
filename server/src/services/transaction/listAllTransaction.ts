
import type { TransactionViewRow } from "../../utils/types.js";
import transactionDao from "../../db/transactionDao/index.js";

const {
    readTransaction
} = transactionDao

export const listAllTransaction = async (): Promise<TransactionViewRow[]> => {
    try {
        // expecting no body
        // expecting no queries
        // expecting no params

        // fetch Customer list using readTransaction from transactionDao
        const listedCustomer = await readTransaction();
        console.log(">>>service - listAllTransaction readCustomer response", listedCustomer);
        return listedCustomer;
    } catch(error) {
        console.log(`error at service - listAllTransaction`, error);
        throw new Error('error at service - listAllTransaction' + error );
    }
}