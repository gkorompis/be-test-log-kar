
import type { ProductViewRow } from "../../utils/types.js";
import productDao from "../../db/productDao/index.js"; 

const {
    // readProduct,
    readProduct
} = productDao

export const listAllProduct = async (): Promise<ProductViewRow[]> => {
    try {
        // expecting no body
        // expecting no queries
        // expecting no params

        // fetch product list using readProduct from productDao
        const listedProduct = await readProduct();
        console.log(">>>service - listAllProduct readProduct response", listedProduct);
        return listedProduct;
    } catch(error) {
        console.log(`error at service - listAllProduct`, error);
        throw new Error('error at service - listAllProduct' + error );
    }
}