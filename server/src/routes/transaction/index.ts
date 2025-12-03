import express from 'express';
import { transactionController } from '../../controller/index.js';

const app = express();
app.use(express.json());

const transactionRoute = express.Router();

const {
    postController,
    getController,
    getOneController
} = transactionController;

transactionRoute.post(
    '/',
    [],
    postController
);
transactionRoute.get(
    '/',
    [],
    getController
)
transactionRoute.get(
    '/one/:id',
    [],
    getOneController
)

export default transactionRoute;