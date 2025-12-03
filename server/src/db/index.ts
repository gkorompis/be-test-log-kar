import {Pool} from 'pg';
import dontenv from 'dotenv';

dontenv.config();
const connectionURL = process.env.DATABASE_URL;

if(!connectionURL){
    throw new Error("DATABASE_URL is missing");
};

export const pool = new Pool({
    connectionString: connectionURL
});
