CREATE TYPE product_type_enum AS ENUM ('keripik pangsit');
CREATE TYPE product_variant_enum AS ENUM ('small','medium','large');

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_name TEXT NOT NULL,
  product_type product_type_enum NOT NULL,
  product_variant product_variant_enum NOT NULL,
  product_price NUMERIC(12,2) NOT NULL CHECK (product_price >= 0),
  created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
