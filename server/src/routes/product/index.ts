import express from 'express';
import { productController } from '../../controller/index.js';

const app = express();
app.use(express.json());

const productRoute = express.Router();

const {
    postController,
    getController
} = productController;

productRoute.post(
    '/',
    [],
    postController
);
productRoute.get(
    '/',
    [],
    getController
);
productRoute.get(
    '/id/:productId',
    [],
    getController
)

export default productRoute;