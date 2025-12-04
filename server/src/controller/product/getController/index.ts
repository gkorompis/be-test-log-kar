import type { Request, Response } from 'express';
import productService from '../../../services/productServices/index.js';

const controllerName = "getController";
const group = "Product"

const productGetController = async (req: Request, res: Response) =>{
    try {
        //request parameters
        console.log(`>>>>${controllerName} at ${group}`);
        const document = req.body || {};
        
        //service logic
        const responseService = await productService.listAllProduct();
        const response = responseService;

        //response
        console.log(`>>>>response ${controllerName} at ${group}`, response);
        return res.status(200).json({response});
        
    } catch(error){
        console.log(`>>>>error ${controllerName} at ${group}`, error);
        return res.status(500).json({message: "Something went wrong on our end. Please try again later."});
    }
};
export default productGetController;