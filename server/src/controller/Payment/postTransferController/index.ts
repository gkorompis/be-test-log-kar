import type { Request, Response } from 'express';

const controllerName = "postTransferController";
const group = "Payment"

const paymentPostTransferController = async (req: Request, res: Response) =>{
    try {
        //request parameters
        console.log(`>>>>${controllerName} at ${group}`);
        const {transaction_id} = (req&&req.params)
        const document = req.body || {};
        
        //dao
        const response = {payload: `payment post TRANSFER ROUTE response for transaction_id: ${transaction_id}`};

        //response
        console.log(`>>>>response ${controllerName} at ${group}`, response);
        return res.status(200).json({response});
        
    } catch(error){
        console.log(`>>>>error ${controllerName} at ${group}`, error);
        return res.status(500).json({message: "Something went wrong on our end. Please try again later."});
    }
};
export default paymentPostTransferController;