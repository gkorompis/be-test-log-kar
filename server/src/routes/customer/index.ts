import express from 'express';
import { customerController } from '../../controller/index.js';

const app = express();
app.use(express.json());

const customerRoute = express.Router();

const {
    getController,
    getOneController
} = customerController;


customerRoute.get(
    '/',
    [],
    getController
)
customerRoute.get(
    '/id/:customerId',
    [],
    getController
)

export default customerRoute;