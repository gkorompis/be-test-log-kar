import { pool } from "../index.js";
import type { ProductInsertRow } from "../../utils/types.js";

const functionName = "insertProduct"
const schemaName = "product.sql"

const insertProduct = async(document: ProductInsertRow) => {
    try{
        const query = `
            INSERT INTO products 
                (product_name, product_type, product_variant, product_price)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [
            document.product_name,
            document.product_type,
            document.product_variant,
            document.product_price,
        ];
        const result = await pool.query(query, values);
        return result.rows[0];

    } catch (error) {
        console.log(`>>>catch error ${functionName} at ${schemaName}`, error);
        throw new Error(`Error inserting product at: ${schemaName} ` + JSON.stringify(error));
    }
};

export default insertProduct;