import { pool } from "../index.js";
import type { CustomerViewRow } from "../../utils/types.js";

const functionName = "readSpecialCustomer"
const schemaName = "product.sql"

const readSpecialCustomer = async(customerId?:number, customer_name?:string):Promise<CustomerViewRow[]> => {
    try{
        if(customerId){
            const query = `
                SELECT *
                FROM customers c
                WHERE c.id= $1;
            `;
            const values = [customerId];
            const result = await pool.query(query, values);
            const rows = result.rows;
            return rows;
        };
        if(customer_name){
            const query = `
                SELECT *
                FROM customers c
                WHERE c.customer_name = $1;
            `;
            const values = [customer_name];
            const result = await pool.query(query, values);
            const rows = result.rows;
            return rows;
        };
        const query =`
            SELECT
                *
            FROM customers;
            `;
        const result = await pool.query(query);
        const rows = result.rows;
        return rows;

    } catch (error) {
        console.log(`>>>catch error ${functionName} at ${schemaName}`, error);
        throw new Error(`Error reading product at: ${schemaName} ` + JSON.stringify(error));
    }
};

export default readSpecialCustomer;