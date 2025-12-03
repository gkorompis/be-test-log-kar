import type { Request, Response } from 'express';

const controllerName = "getOneController";
const group = "Transaction"

const transactionGetOneController = async (req: Request, res: Response) =>{
    try {
        //request parameters
        console.log(`>>>>${controllerName} at ${group}`);
        const document = req.body || {};
        
        //dao
        const response = {payload: "transaction get one response", document};

        //response
        console.log(`>>>>response ${controllerName} at ${group}`, response);
        return res.status(200).json({response});
        
    } catch(error){
        console.log(`>>>>error ${controllerName} at ${group}`, error);
        return res.status(500).json({message: "Something went wrong on our end. Please try again later."});
    }
};
export default transactionGetOneController;