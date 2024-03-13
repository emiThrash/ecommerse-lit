import { ProductData } from "./ProductData";

export const CartData = [
    {
      id: 1,
      productId: 1,
      quantity: 4,
      subTotal: ProductData.find(p => p.id == 1).price * 4,
      product: ProductData.find(p => p.id == 1),
    },
    {
      id: 2,
      productId: 3,
      quantity: 1,
      subTotal: ProductData.find(p => p.id == 3).price * 1,
      product: ProductData.find(p => p.id == 3),
    },
    {
      id: 3,
      productId: 5,
      quantity: 2,
      subTotal: ProductData.find(p => p.id == 5).price * 2,
      product: ProductData.find(p => p.id == 5),
    },
    {
      id: 4,
      productId: 8,
      quantity: 1,
      subTotal: ProductData.find(p => p.id == 3).price * 1,
      product: ProductData.find(p => p.id == 3),
    },
    {
      id: 2,
      productId: 9,
      quantity: 2,
      subTotal: ProductData.find(p => p.id == 5).price * 5,
      product: ProductData.find(p => p.id == 5),
    },    
];