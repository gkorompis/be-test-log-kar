import { pool } from "../index.js";
import type { TransactionInsertRow, TransactionViewRow } from "../../utils/types.js";

const functionName = "insertTransaction"
const schemaName = "transaction.sql and customer.sql"

const insertTransaction = async(document: TransactionInsertRow)=> {
     const client = await pool.connect();
    try{
        console.log(">>>dao insertTransaction begin query")
        await client.query("BEGIN");

        const upsertCustomerQuery = `
            INSERT INTO customers (customer_name, points)
            VALUES ($1, 0)
            ON CONFLICT (customer_name) DO NOTHING
            RETURNING *;
        `;
        const upsertRes:any = await client.query(upsertCustomerQuery, [document.customer_name]);
        console.log(">>>upsertingCustomer", upsertRes );

        let customerUser: string;
        let isNewCustomer=true;
        let customerDetail = upsertRes.rows[0];
        if (upsertRes.rowCount > 0) {
        customerUser = upsertRes.rows[0].customer_name;
        console.log("newly_created_customer", customerUser);
        } else {
        isNewCustomer=false;
        const queryExistingCustomer = `SELECT * FROM customers WHERE customer_name = $1`;
        const valueExistingCustomer = [document.customer_name]
        const existing_customer = await client.query(queryExistingCustomer,valueExistingCustomer);
        console.log(">>>existing_customer", existing_customer);
        if (existing_customer.rowCount === 0) throw new Error("Failed to handle customer exists: customer does not exist.");
        customerUser = existing_customer.rows[0].customer_name;
        customerDetail=existing_customer.rows[0];
        }

        const queryTransaction = `
            INSERT INTO transactions (customer_name, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const valuesTransaction = [
            customerUser,
            document.product_id,
            document.quantity
        ];
        const result = await client.query(queryTransaction, valuesTransaction);
        console.log(">>>insertTransaction Final Response", result, result.rows[0])
        await client.query("COMMIT");
        const insertResult ={
            createdTransaction: result.rows[0],
            customerInfo: customerDetail,
            isNewCustomer
        }
        return insertResult;

    } catch (error) {
        console.log(`>>>catch error ${functionName} at ${schemaName}`, error);
        await client.query("ROLLBACK");
        throw new Error(`Error inserting transaction at: ${schemaName} ` + JSON.stringify(error));
    } finally {
        client.release()
    }
};

export default insertTransaction;