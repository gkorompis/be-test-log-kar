import type { Request, Response } from 'express';
import productService from '../../../services/productServices/index.js';

const controllerName = "postController";
const group = "Product";

const productPostController = async (req: Request, res: Response) =>{
    try {
        //request parameters
        console.log(`>>>>${controllerName} at ${group}`);
        const document = req.body || 
        {
            product_name: "Keripik Ori",
            product_type: "keripik pangsit",
            product_variant: "small",
            product_price: 12000,
        };
        
        //service logic
        const createdResult = await productService.createNewProduct(document)

        const response = createdResult;

        //response
        console.log(`>>>>response ${controllerName} at ${group}`, response);
        return res.status(200).json({response});
        
    } catch(error){
        console.log(`>>>>error ${controllerName} at ${group}`, error);
        return res.status(500).json({message: "Something went wrong on our end. Please try again later."});
    }
};
export default productPostController;