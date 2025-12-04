import { createNewTransactionWithCustomer } from "./createNewTransactionWithCustomer.js"
import { listAllTransaction } from "./listAllTransaction.js"
import { listSpecialTransaction } from "./listSpecialTransaction.js"

const transactionService = {
    createNewTransactionWithCustomer,
    listAllTransaction,
    listSpecialTransaction
}

export default transactionService