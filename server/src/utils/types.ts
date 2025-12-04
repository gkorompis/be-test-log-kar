export interface ProductInsertRow {
  product_name: string;
  product_type: "keripik pangsit";
  product_variant: "small" | "medium" | "lage";
  product_price: number;
}
export interface ProductViewRow {
  product_name: string;
  product_type: "keripik pangsit";
  product_variant: "small" | "medium" | "lage";
  product_price: number;
  created_date: Date;
}