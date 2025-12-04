import type { Request, Response } from 'express';
import customerService from '../../../services/customerServices/index.js';

const controllerName = "getController";
const group = "Customer"

const customerGetController = async (req: Request, res: Response) =>{
    try {
        //request parameters
        console.log(`>>>>${controllerName} at ${group}`);
        const document = (req&&req.body) || {};
        const query = (req&&req.query) || {};
        const params = (req&&req.params) || {};
        const {customer_name} = query;
        const {customerId} = params;
        
        //service logic
        const response = await customerService.listAllCustomer();

        //response
        console.log(`>>>>response ${controllerName} at ${group}`, response);
        return res.status(200).json({response});
        
    } catch(error){
        console.log(`>>>>error ${controllerName} at ${group}`, error);
        return res.status(500).json({message: "Something went wrong on our end. Please try again later."});
    }
};
export default customerGetController;