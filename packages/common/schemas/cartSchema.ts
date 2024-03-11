import { productType } from "../schemas/productSchema";

export type cartType = {
  item: productType;
  quantity: number;
  _id: any;
};
