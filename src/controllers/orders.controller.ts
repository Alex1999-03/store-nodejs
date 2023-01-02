import { RequestHandler } from "express";
import { Order } from "../models/order";
import { StatusCode } from "../utils/enums";
import { IOrderItems } from "../utils/interfaces";
import { OrderBodyType } from "../schemas/order";
import { ParamsType } from "../schemas/id";

const getTotal = (items: IOrderItems[]) => {
  return items.reduce((acc, el) => acc + el.price * el.quantity, 0);
};

export const getOrders: RequestHandler = async (_req, res, next) => {
  try {
    const orders = await Order.find();
    return res.status(StatusCode.OK).json(orders);
  } catch (error) {
    return next(error);
  }
};

export const getOrder: RequestHandler<ParamsType, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The order does not exist." });

    return res.status(StatusCode.OK).json(order);
  } catch (error) {
    return next(error);
  }
};

export const postOrder: RequestHandler<
  unknown,
  unknown,
  OrderBodyType
> = async (req, res, next) => {
  try {
    const total = getTotal(req.body.items);
    const newOrder = await Order.create({ ...req.body, total: total });
    return res.status(StatusCode.CREATED).json(newOrder);
  } catch (error) {
    return next(error);
  }
};

export const putOrder: RequestHandler<
  ParamsType,
  unknown,
  OrderBodyType
> = async (req, res, next) => {
  try {
    const total = getTotal(req.body.items);
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { ...req.body, total: total },
      { new: true }
    );
    if (!updatedOrder)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The order does not exist." });
    return res.status(StatusCode.OK).json(updatedOrder);
  } catch (error) {
    return next(error);
  }
};

export const deleteOrder: RequestHandler<ParamsType, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The order does not exist." });
    }
    return res.status(StatusCode.OK).json(deletedOrder);
  } catch (error) {
    return next(error);
  }
};
