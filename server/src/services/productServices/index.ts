import { createNewProduct } from "./createNewProduct.js";
import { listAllProduct } from "./listAllProduct.js";
import { listAllProductWithQuantity } from "./listAllProductWithQuantity.js";

const productService = {
    createNewProduct,
    listAllProduct,
    listAllProductWithQuantity
}

export default productService