
import type { ProductInsertRow } from "../../utils/types.js";
import productDao from "../../db/productDao/index.js";

const {
    insertProduct
} = productDao

export const createNewProduct = async (document:ProductInsertRow) => {
    try {
        const insertValues = document;
        const createdProduct = await insertProduct(insertValues);
        console.log(">>>service - createNewProduct insertProduct response", createdProduct);
        return createdProduct;
    } catch(error) {
        console.log(`error at service - createNewProduct`, error);
        throw new Error('error at service - createNewProduc' + error );
    }
}