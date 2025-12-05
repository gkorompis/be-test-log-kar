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

export type TransactionInsertRow = {
  customer_name: string;  
  product_id: number;
  quantity: number;
  points?: number | string;
};
export type TransactionViewRow = {
  id: string;                   
  customer_name: string;
  product_name: string;
  product_size: string | null;
  product_variant: string | null;
  quantity: number;
  total_transaction: string;    
  transaction_date: string;     
};

export type CustomerViewRow = {
  id: number | string;
  customer_name: string;  
  points: number;
};

export type CustomerPatchObject = {
  patchReference: string;
  listPatchField: string[],
  listPatchValue: any[]
}