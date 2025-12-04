import { pool } from "../index.js";
import type { ProductViewRow } from "../../utils/types.js";

const functionName = "readSpecialProduct"
const schemaName = "product.sql"

const readSpecialProduct = async(special_rule:string):Promise<ProductViewRow[]> => {
    try{
        if(!(special_rule==="quantity")){
            return []
        };

        const query = `
            SELECT
                p.*,
                COUNT(*) OVER(
                    PARTITION BY p.product_type, p.product_variant
                ) AS quantity
            FROM products p;
        `;
        const result = await pool.query(query);
        const rows = result.rows;
        return rows;

    } catch (error) {
        console.log(`>>>catch error ${functionName} at ${schemaName}`, error);
        throw new Error(`Error reading product at: ${schemaName} ` + JSON.stringify(error));
    }
};

export default readSpecialProduct;