import { CartData } from "./CartData";

export const OrderData = [
    {
      id: 1,
      total: (CartData[0].subTotal + CartData[2].subTotal),
      buyCartList: [CartData[0], CartData[2]]
    },
    {
      id: 2,
      total: (CartData[1].subTotal + CartData[2].subTotal),
      buyCartList: [CartData[1], CartData[2]]
    },
    {
      id: 3,
      total: (CartData[0].subTotal + CartData[1].subTotal + CartData[2].subTotal),
      buyCartList: [CartData[0], CartData[1], CartData[2]]
    },
    {
      id: 4,
      total: (CartData[0].subTotal + CartData[2].subTotal),
      buyCartList: [CartData[0], CartData[2]]
    },
    {
      id: 5,
      total: (CartData[1].subTotal + CartData[2].subTotal),
      buyCartList: [CartData[1], CartData[2]]
    },
    {
      id: 6,
      total: (CartData[0].subTotal + CartData[1].subTotal + CartData[2].subTotal),
      buyCartList: [CartData[0], CartData[1], CartData[2]]
    }    
];