import { RequestHandler } from "express";
import { Category } from "../models/category";
import { CategoryBodyType } from "../schemas/category";
import { ParamsType } from "../schemas/id";
import { StatusCode } from "../utils/enums";

export const getCategories: RequestHandler = async (_req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(StatusCode.OK).json(categories);
  } catch (error) {
    return next(error);
  }
};

export const getCategory: RequestHandler<ParamsType, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "the category does not exist." });

    return res.status(StatusCode.OK).json(category);
  } catch (error) {
    return next(error);
  }
};

export const postCategory: RequestHandler<
  unknown,
  unknown,
  CategoryBodyType
> = async (req, res, next) => {
  try {
    const categoryExist = await Category.findOne({ name: req.body.name });
    if (!categoryExist) {
      const newCategory = await Category.create(req.body);
      return res.status(StatusCode.CREATED).json(newCategory);
    }
    return res
      .status(StatusCode.CONFLICT)
      .json({ message: "The category name already exist." });
  } catch (error) {
    return next(error);
  }
};

export const putCategory: RequestHandler<
  ParamsType,
  unknown,
  CategoryBodyType
> = async (req, res, next) => {
  try {
    const nameExist = await Category.findOne({
      name: req.body.name,
      _id: { $ne: req.params.id },
    });

    if (nameExist) {
      return res
        .status(StatusCode.CONFLICT)
        .json({ message: "The category name already exist." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCategory)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "the category does not exist." });

    return res.status(StatusCode.OK).json(updatedCategory);
  } catch (error) {
    return next(error);
  }
};

export const deleteCategory: RequestHandler<
  ParamsType,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "the category does not exist." });

    return res.status(StatusCode.OK).json(deletedCategory);
  } catch (error) {
    return next(error);
  }
};
