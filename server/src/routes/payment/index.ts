import express from 'express';
import { paymentController } from '../../controller/index.js';

const app = express();
app.use(express.json());

const paymentRoute = express.Router();

const {
    postTransferController,
    postRedeemController
} = paymentController;

paymentRoute.post(
    '/transfer/:transaction_id',
    [],
    postTransferController
);
paymentRoute.post(
    '/redeem/:transaction_id',
    [],
    postRedeemController
);

export default paymentRoute;