import { pool } from "../index.js";
import type { ProductViewRow } from "../../utils/types.js";

const functionName = "readProduct"
const schemaName = "product.sql"

const readProduct = async():Promise<ProductViewRow[]> => {
    try{
        const query = `
            SELECT *
            FROM products;
        `;
        const result = await pool.query(query);
        const rows = result.rows;
        return rows;

    } catch (error) {
        console.log(`>>>catch error ${functionName} at ${schemaName}`, error);
        throw new Error(`Error reading product at: ${schemaName} ` + JSON.stringify(error));
    }
};

export default readProduct;