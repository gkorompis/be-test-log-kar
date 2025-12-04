import insertProduct from "./insertProduct.js";
import readProduct from "./readProduct.js";
import readSpecialProduct from "./readSpecialProduct.js";

const productDao = {
    insertProduct,
    readProduct,
    readSpecialProduct
};

export default productDao;