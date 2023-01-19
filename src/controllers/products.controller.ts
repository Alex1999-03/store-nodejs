import fs from "node:fs/promises";
import { RequestHandler } from "express";
import { Product } from "../models/product";
import { uploadImage, deleteImage } from "../services/cloudinary.services";
import { StatusCode } from "../utils/enums";
import { ParamsType } from "../schemas/id";
import { ProductBodyType } from "../schemas/product";
import { IProduct } from "../utils/interfaces";

export const getProducts: RequestHandler = async (_req, res, next) => {
  try {
    const products = await Product.find().populate(["brand", "category"]);
    return res.status(StatusCode.OK).json(products);
  } catch (error) {
    return next(error);
  }
};

export const getProduct: RequestHandler<ParamsType, unknown, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The product does not exist." });
    return res.status(StatusCode.OK).json(product);
  } catch (error) {
    return next(error);
  }
};

export const postProduct: RequestHandler<
  unknown,
  unknown,
  ProductBodyType
> = async (req, res, next) => {
  try {
    const productExist = await Product.findOne({ name: req.body.name });
    if (!productExist) {
      const product = new Product(req.body);
      const files = <Express.Multer.File[]>req.files;
      for (let file of files) {
        const filename = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const path = `src/tmp/${filename}`;
        await fs.writeFile(path, file.buffer);
        const result = await uploadImage(path);
        product.images.push({
          publicId: result.public_id,
          secureUrl: result.secure_url,
        });
        await fs.unlink(path);
      }
      const newProduct = await product.save();
      return res.status(StatusCode.CREATED).json(newProduct);
    }
    return res
      .status(StatusCode.CONFLICT)
      .json({ message: "The product name already exist." });
  } catch (error) {
    return next(error);
  }
};

export const putProduct: RequestHandler<
  ParamsType,
  unknown,
  ProductBodyType
> = async (req, res, next) => {
  try {
    const nameExist = await Product.findOne({
      name: req.body.name,
      _id: { $ne: req.params.id },
    });

    if (nameExist) {
      return res
        .status(StatusCode.CONFLICT)
        .json({ message: "The product name already exist." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The product does not exist." });

    return res.status(StatusCode.OK).json(updatedProduct);
  } catch (error) {
    return next(error);
  }
};

export const deleteProduct: RequestHandler<
  ParamsType,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    const product = (await Product.findById(req.params.id)) as IProduct;

    if (!product)
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "The product does not exist." });

    for (let image of product.images) {
      await deleteImage(image.publicId);
    }

    await Product.deleteOne({ id: product.id });

    return res.status(StatusCode.OK).json(product);
  } catch (error) {
    return next(error);
  }
};
