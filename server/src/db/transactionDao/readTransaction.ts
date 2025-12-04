import { pool } from "../index.js";
import type { TransactionViewRow } from "../../utils/types.js";

const functionName = "readTransaction"
const schemaName = "product.sql"

const readTransaction = async(transaction_id?:string):Promise<TransactionViewRow[]> => {
    try{
        if(transaction_id){
            const query = `
                SELECT *
                FROM transactions t
                WHERE t.id = $1;
            `;
            const values = [transaction_id];
            const result = await pool.query(query, values);
            const rows = result.rows;
            return rows;
        };

        const query =`
            SELECT
                *
            FROM transactions;
            `;
        const result = await pool.query(query);
        const rows = result.rows;
        return rows;

    } catch (error) {
        console.log(`>>>catch error ${functionName} at ${schemaName}`, error);
        throw new Error(`Error reading product at: ${schemaName} ` + JSON.stringify(error));
    }
};

export default readTransaction;