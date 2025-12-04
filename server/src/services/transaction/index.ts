import { createNewTransactionWithCustomer } from "./createNewTransactionWithCustomer.js"
import { listAllTransaction } from "./listAllTransaction.js"

const transactionService = {
    createNewTransactionWithCustomer,
    listAllTransaction
}

export default transactionService