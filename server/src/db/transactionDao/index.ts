// import insertProduct from "./insertProduct.js";
// import readProduct from "./readProduct.js";
// import readSpecialProduct from "./readSpecialPrduct.js";
import insertTransaction from "./insertTransaction.js";
import readTransaction from "./readTransaction.js";

const transactionDao = {
    insertTransaction,
    readTransaction
};

export default transactionDao;