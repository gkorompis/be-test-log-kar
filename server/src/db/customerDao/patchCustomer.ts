import { pool } from "../index.js";
import type { CustomerPatchObject, CustomerViewRow } from "../../utils/types.js";

const functionName = "patchCustomer";
const schemaName = "customer.sql";

const patchCustomer = async(PatchObject:CustomerPatchObject):Promise<CustomerViewRow[]> => {
    try{
        if(!PatchObject){
            throw new Error("patch object is missing")
        }
        const {patchReference, listPatchField, listPatchValue} = PatchObject;

        // make sure list of field and list of value same length
        if(!(listPatchField.length === listPatchValue.length)){
            throw new Error(`Error at dao patchCustomer - list patch field and list patch value doesn't match`)
        }

        // setting dynamic set query
        const setQuery = listPatchField.map((field:string, id:any)=>{
            return `${field} = ${listPatchValue[id]}`
        }).join(", ")

        // define poolQuery and poolValue
        console.log(">>>setQuery", setQuery, "from", listPatchField, listPatchValue);
        const poolQuery = `
            UPDATE customers
            SET ${setQuery}
            WHERE customer_name = $1
            RETURNING *;
        `
        const poolValue = [patchReference];
        console.log(">>>patching", listPatchField, "with", poolValue);
        const result = await pool.query(poolQuery, poolValue);
        console.log(">>>patching response", {result});
        const rows = result.rows;
        console.log(">>>patching response rows", {rows});
        return rows;
    } catch (error) {
        console.log(`>>>catch error ${functionName} at ${schemaName}`, error);
        throw new Error(`Error reading product at: ${schemaName} ` + JSON.stringify(error));
    }
};

export default patchCustomer;