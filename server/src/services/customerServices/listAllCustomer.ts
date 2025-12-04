
import type { CustomerViewRow } from "../../utils/types.js";
import customerDao from "../../db/customerDao/index.js";

const {
    readCustomer
} = customerDao

export const listAllCustomer = async (): Promise<CustomerViewRow[]> => {
    try {
        // expecting no body
        // expecting no queries
        // expecting no params

        // fetch Customer list using readCustomer from customerDao
        const listedCustomer = await readCustomer();
        console.log(">>>service - listAllCustomer readCustomer response", listedCustomer);
        return listedCustomer;
    } catch(error) {
        console.log(`error at service - listAllCustomer`, error);
        throw new Error('error at service - listAllCustomer' + error );
    }
}