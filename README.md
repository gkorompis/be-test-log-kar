# Backend Test Log Kar

## 1. Business Requirements
| No | Requirement | Group |
|---|---------------------|----------|
| req-1 | user can list product | req-1 |
| req-2 | user can list product's availability (quantity) | req-1 |
| req-3 | user can add product by inserting: product_name, product_type, product_variant, product_size, product_harga | req-3 | 
| req-4 | system can automataticaly record product created_date | req-3 |
| req-5 | user can make new transaction | req-5 |
| req-6 | system can authenticate payment by matching transaction_total_price with money | req-6 |
| req-7 | system can calculate points generated per transaction with unique id | req-6 |
| req-8 | system can register new customer by inserting: customer_name, customer_points | req-6 |
| req-9 | system can check whether customers are new or existing | req-6 |
| req-10 | system can update by adding customer_points for existing customer | req-6 |
| req-11 | user can redeem point | req-11 |
| req-12 | system can map size with price | req-11 |
| req-13 | system can map authenticate redeem by matching size price with customer_points | req-11 |
| req-14 | system can update by decreasing customer_points after redeem | req-11 |
| req-15 | system can update transaction_status of transaction_id after payment | req-6 |

## 2. Route Layers CRUD
| Route | Create | Read (All, One) | Update (One) | Delete (One) |
|------|------|------|------|------|
| Product | /products | /products, /products/:id | /products/:id?query | - |
| Transactions | /transactions | /transactions, /transactions/:id | /transactions/:id?query | - |
| Customer | - | /customers/:id | /customers/:id?query | - |
| Payment | - | - | - | - |

## 3. Route - Service - DAO Layers Mapping

| Route | Method | Service Name | Service Logic | DAO Mapping | Requirement Mapping |
|------|------|------|------|------|------|
| /product | GET | listProducts(needCounts:false) | to list products without addition quantity (count) information for each product_type | findAllProduct | req-1 |
| /product | GET | listProducts(needCounts:true) | to list products with addition quantity (count) information for each product_type | findAllProductWithTypeCount | req-2, req-1 |
| /product | POST | createNewProduct | adding product with fields product_name, product_type, product_variant, product_size, product_harga, and automatic created_date | insertProduct | req-3, req-4 |
| /transaction | POST | addNewTransaction | adding transactionw with fields customer_name, product_name, product_size, product_type, product_quantity, and automatic transaction_date, transaction_id (unique) | createTransaction | req-5 |
| /payment/transfer | PUT | authenticatePayment | this service will match transaction_total_price with default money | - | req-6 |
| - | - | calculatePointsPerTransaction | this service will be called by authenticatePayment | getTransaction(id) | req-7, req-6 |
| - | - | registerNewUser | this service will be called by authenticatePayment to check if customer_name existed or not, if doesn't exist it will create new one | addNewCustomer | req-8, req-9, req-6 |
| - | - | addCustomerPoints | this service will be called by authenticatePayment to update by adding customer_name's customer_point | updateByAddingCustomerPoint | req-10 |
| /payment/redeem | PUT | authenticateRedeem | this service will convert transaction_total_price into points and then will match customer points | getTransaction(id), getCustomer(id) | req-11, req-12, req-13 |
| - | - | minusCustomerPoints | this service will be called by authenticateRedeem to update by substracting customer_name's customer_points | updateBySubtractingCustomerPoint | req-14 |
| - | - | labelPaidTransaction | this service will be called by either authenticatePayment or authenticateRedeem to update transactionId status | updateTransaction(id) | req-15, req-6 |

## 4. Model Schema

### 4.1 Product
```javascript
interface ProductInsertRow {
    product_name: string,
    product_type: string, enum: ["keripik pangsit"],
    product_variant: string, enum: ["small", "medium", "lage"],
    product_price: number,
    created_date: Date
}
interface ProductViewRow {
    product_name: string,
    product_type: string, enum: ["keripik pangsit"],
    product_variant: string, enum: ["small", "medium", "lage"],
    product_price: number,
    created_date: Date
}
interface ProductWithTypeCountRow {
    product_name: string,
    product_type: string, enum: ["keripik pangsit"],
    product_variant: string, enum: ["small", "medium", "lage"],
    product_price: number,
    quantity: number
}
```

### 4.2 Transaction
```javascript
interface TransactionInsertRow {
    id: uuid,
    customer_name: string unique,
    product_id: number,
    quantity: number,
    transaction_date: Date,
}
interface TransactionViewRow {
    id: uuid,
    customer_name: string unique,
    product_name: string,
    product_size: string,
    product_variant: string,
    quantity: number,
    transaction_date: Date,
}
```

### 4.3 Customer
```javascript
interface CustomerInsertRow{
    id: unique,
    customer_name: string unique,
    customer_points: number,
}
```

## 5. API Documentation

### 5.1 Products

| route | method | parameters | query | request body | expected response |
|------|------|------|------|------|------|
| /products | POST | - | - | \`\`\`json  
{  
  "product_name": "Keripik Ori",  
  "product_type": "keripik pangsit",  
  "product_variant": "large",  
  "product_price": "15000.00"  
}  \`\`\` | \`\`\`json  
  "response": {
        "id": 7,
        "product_name": "Keripik Ori",
        "product_type": "keripik pangsit",
        "product_variant": "large",
        "product_price": "15000.00",
        "created_date": "2025-12-03T13:15:04.588Z"
    }
\`\`\` |


 