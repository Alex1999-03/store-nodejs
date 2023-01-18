import { RequestHandler } from "express";
import { Brand } from "../models/brand";
import { BrandBodyType } from "../schemas/brand";
import { ParamsType } from "../schemas/id";
import { StatusCode } from "../utils/enums";

export const getBrands: RequestHandler = async (_req, res, next) => {
  try {
    const brands = await Brand.find();
    return res.status(StatusCode.OK).json(brands);
  } catch (error) {
    return next(error);
  }
};

export const getBrand: RequestHandler<ParamsType, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The brand does not exist." });
    return res.status(StatusCode.OK).json(brand);
  } catch (error) {
    return next(error);
  }
};

export const postBrand: RequestHandler<
  unknown,
  unknown,
  BrandBodyType
> = async (req, res, next) => {
  try {
    const brandExist = await Brand.findOne({ name: req.body.name });
    if (!brandExist) {
      const newBrand = await Brand.create(req.body);
      return res.status(StatusCode.CREATED).json(newBrand);
    }
    return res
      .status(StatusCode.FORBIDDEN)
      .json({ message: "The brand name already exist." });
  } catch (error) {
    return next(error);
  }
};

export const putBrand: RequestHandler<
  ParamsType,
  unknown,
  BrandBodyType
> = async (req, res, next) => {
  try {
    const nameExist = await Brand.findOne({ name: req.body.name });

    if (nameExist) {
      return res
        .status(StatusCode.FORBIDDEN)
        .json({ message: "The brand name already exist." });
    }
    
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedBrand)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The brand does not exist." });

    return res.status(StatusCode.OK).json(updatedBrand);
  } catch (error) {
    return next(error);
  }
};

export const deleteBrand: RequestHandler<ParamsType, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);

    if (!deletedBrand)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The brand does not exist." });

    return res.status(StatusCode.OK).json(deletedBrand);
  } catch (error) {
    return next(error);
  }
};
