
import type { ProductViewRow } from "../../utils/types.js";
import productDao from "../../db/productDao/index.js"; 

const {
    // readProduct,
    readSpecialProduct
} = productDao

export const listAllProductWithQuantity = async (): Promise<ProductViewRow[]> => {
    try {
        // expecting no body
        // expecting no queries
        // expecting no params

        // fetch product list using readProduct from productDao
        const listedProduct = await readSpecialProduct("quantity");
        console.log(">>>service - listAllProductWithQuantity readSpecialProduct response", listedProduct);
        return listedProduct;
    } catch(error) {
        console.log(`error at service - listAllProductWithQuantity`, error);
        throw new Error('error at service - listAllProductWithQuantity' + error );
    }
}