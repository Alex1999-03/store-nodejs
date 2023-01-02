import { IOrderItems } from "../utils/interfaces";

export const getTotal = (items: IOrderItems[]) => {
  return items.reduce((acc, el) => acc + el.price * el.quantity, 0);
};
