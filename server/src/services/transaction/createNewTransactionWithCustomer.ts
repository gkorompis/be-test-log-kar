
import type { TransactionInsertRow } from "../../utils/types.js";
import transactionDao from "../../db/transactionDao/index.js";
import customerDao from "../../db/customerDao/index.js";

const {
    insertTransaction
} = transactionDao;
const {
    patchCustomer
} = customerDao

export const createNewTransactionWithCustomer = async (document:TransactionInsertRow) => {
    try {
        const insertValues = document;
        // insert transaction to table transactions
        const createdProduct = await insertTransaction(insertValues);

        // calculating points and appending points to transaction document
        const {customerInfo, createdTransaction} = createdProduct;
        const previousPoint = +(customerInfo&&customerInfo.points);
        const totalTransaction = +(createdTransaction&&createdTransaction.total_transaction);
        const calculatedPoint = totalTransaction/1000;
        const currentPoint=previousPoint+calculatedPoint;

        const patchedCustomerInfo = {...customerInfo, points: currentPoint};

        // patching customer_name's points with new points
        const patchReference = customerInfo.customer_name;
        const listPatchField = ["points"];
        const listPatchValue = [currentPoint];
        const PatchObject = {
            patchReference,
            listPatchField,
            listPatchValue
        }

        // CROSS DAO
        const patchingCustomerResponse = await patchCustomer(PatchObject);
        const createdProductWithPoints = {
            ...createdProduct,
            customerInfo: patchingCustomerResponse || patchedCustomerInfo,
            pointFromThisTransaction: calculatedPoint
        }
        console.log(">>>service - createNewTransactionWithCustomer insertProduct response", createdProduct);
        return createdProductWithPoints;
    } catch(error) {
        console.log(`error at service - createNewTransactionWithCustomer`, error);
        throw new Error('error at service - createNewTransactionWithCustomer' + error );
    }
}