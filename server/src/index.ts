import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

// declare secrets env
dotenv.config();
const PORT = process.env.PORT || 5002

// initiating express
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
// app.use("/products", productsRoute)

app.get("/", (req,res)=>{
    res.send("testing backend server")
});

app.listen(PORT, ()=>{
    console.log(`server running on PORT ${PORT}`)
})



