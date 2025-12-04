CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    product_id INT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    total_transaction NUMERIC,
    transaction_date TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- trigger function
CREATE OR REPLACE FUNCTION trg_calc_total_transaction()
RETURNS TRIGGER AS $$
DECLARE
  price NUMERIC;
BEGIN
  SELECT product_price INTO price FROM products WHERE id = NEW.product_id;
  IF price IS NULL THEN
    RAISE EXCEPTION 'product id % not found', NEW.product_id;
  END IF;

  NEW.total_transaction := price * NEW.quantity;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger
DROP TRIGGER IF EXISTS transactions_calc_total ON transactions;
CREATE TRIGGER transactions_calc_total
BEFORE INSERT OR UPDATE ON transactions
FOR EACH ROW EXECUTE FUNCTION trg_calc_total_transaction();