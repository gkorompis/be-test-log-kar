import type { Request, Response } from 'express';
import transactionService from '../../../services/transaction/index.js';

const controllerName = "postController";
const group = "Transaction"

const transactionPostController = async (req: Request, res: Response) =>{
    try {
        //request parameters
        console.log(`>>>>${controllerName} at ${group}`);
        const document = req.body || 
        {
            customer_name: "loremipsum",
            product_id: 6,
            quantity: 2
        };
        
        //service logic
        const createdResult = await transactionService.createNewTransactionWithCustomer(document)

        const response = createdResult;

        //response
        console.log(`>>>>response ${controllerName} at ${group}`, response);
        return res.status(200).json({response});
        
    } catch(error){
        console.log(`>>>>error ${controllerName} at ${group}`, error);
        return res.status(500).json({message: "Something went wrong on our end. Please try again later."});
    }
};
export default transactionPostController;