import { pool } from "../index.js";
import type { TransactionViewRow } from "../../utils/types.js";

const functionName = "readSpecialTransaction"
const schemaName = "product.sql"

const readSpecialTransaction = async(transaction_id?:string):Promise<TransactionViewRow[]> => {
    try{
        
        const query = `
            SELECT
                t.id::text,
                c.customer_name,
                p.product_name,
                p.product_variant,
                t.quantity,
                t.total_transaction::text,
                t.transaction_date
            FROM transactions t
            JOIN customers c ON c.customer_name = t.customer_name
            JOIN products  p ON p.id = t.product_id
            ORDER BY t.transaction_date DESC;
        `;
        const result = await pool.query(query);
        const rows = result.rows;
        return rows;

    } catch (error) {
        console.log(`>>>catch error ${functionName} at ${schemaName}`, error);
        throw new Error(`Error reading product at: ${schemaName} ` + JSON.stringify(error));
    }
};

export default readSpecialTransaction;