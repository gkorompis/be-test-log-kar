import patchCustomer from "./patchCustomer.js";
import readCustomer from "./readCustomer.js";
import readSpecialCustomer from "./readSpecialCustomer.js";

const customerDao = {
   readCustomer,
   readSpecialCustomer,
   patchCustomer
};

export default customerDao;