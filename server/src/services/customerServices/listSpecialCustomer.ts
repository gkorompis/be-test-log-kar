
import type { CustomerViewRow } from "../../utils/types.js";
import customerDao from "../../db/customerDao/index.js";

const {
    readSpecialCustomer
} = customerDao

export const listSpecialCustomer = async (customerId?:number, customer_name?:string): Promise<CustomerViewRow[]> => {
    try {
        // expecting no body
        // expecting no queries
        // expecting no params

        // fetch Customer list using readSpecialCustomer from customerDao
        if(customerId){
            const listedCustomer = await readSpecialCustomer(customerId);
            console.log(">>>service - listSpecialCustomer readSpecialCustomer customerId response", listedCustomer);
            return listedCustomer;
        }

        const listedCustomer = await readSpecialCustomer(0,customer_name);
        console.log(">>>service - listSpecialCustomer readSpecialCustomer customer_name response", listedCustomer);
        return listedCustomer;
    } catch(error) {
        console.log(`error at service - listSpecialCustomer`, error);
        throw new Error('error at service - listSpecialCustomer' + error );
    }
}