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
| req-15 | system can update product_quantity after each payment or redeem | req-15 |
| req-16 | system can update transaction_status of transaction_id after payment | req-6 |

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
| /product | POST | addNewProduct | adding product with fields product_name, product_type, product_variant, product_size, product_harga, and automatic created_date | createProduct | req-3, req-4 |
| /transaction | POST | addNewTransaction | adding transactionw with fields customer_name, product_name, product_size, product_type, product_quantity, and automatic transaction_date, transaction_id (unique) | createTransaction | req-5 |
| /payment/transfer | POST | authenticatePayment | this service will match transaction_total_price with default money | - | req-6 |
| - | - | calculatePointsPerTransaction | this service will be called by authenticatePayment | getTransaction(id) | req-7, req-6 |
| - | - | registerNewUser | this service will be called by authenticatePayment to check if customer_name existed or not, if doesn't exist it will create new one | addNewCustomer | req-8, req-9, req-6 |
| - | - | addCustomerPoints | this service will be called by authenticatePayment by updating customer_name's customer_points | CustomerPoint | updateByAddingCustomerPoint | req-10 |
