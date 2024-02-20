import mongoose, { Schema, Document } from 'mongoose';

  const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    qte: { type: Number, required: true },
  });

    export const ProductModel = mongoose.model('Product', ProductSchema);
    export const getProductById = (id: string) => ProductModel.findById(id);
    export const getProducts = () => ProductModel.find();
    export const getProductByName = (name: string) => ProductModel.findOne({ name });
    export const createProduct = (values: Record<string, any>) => new ProductModel(values).save().then((Product) => Product.toObject());
    export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({ _id: id });
    export const updateProductById = (id: string, values: Record<string, any>) => ProductModel.findByIdAndUpdate(id, values);
