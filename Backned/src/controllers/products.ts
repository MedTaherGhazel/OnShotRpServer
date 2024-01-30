import express from 'express';
import {
    getProductById,
    createProduct,
    deleteProductById,
    updateProductById,
    getProductByName,
    getProducts,
} from '../db/products';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const Products = await getProducts();
        return res.status(200).json(Products);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export const getProductBId = async (req: express.Request, res: express.Response) => {
  const productId = req.params.id;

  try {
      const product = await getProductById(productId);

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json(product);
  } catch (error) {
      console.error(error);
      return res.sendStatus(500);
  }
}

export const addProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { name, description, qte } = req.body ;

        if (!name || !qte) {
            console.log('Required fields missing');
            return res.sendStatus(400);
        }

        const existingProduct = await getProductByName(name);

        if (existingProduct) {
            console.log('Product already exists');
            return res.sendStatus(409);
        }

        const newProduct = await createProduct({ name, description, qte });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.log('Error adding Product', error);
        return res.sendStatus(500);
    }
}

export const getProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const Product = await getProductById(id);

        if (!Product) {
            console.log('Product not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(Product);
    } catch (error) {
        console.log('Error getting Product', error);
        return res.sendStatus(500);
    }
}

export const updateProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, description, qte } = req.body ;

        const updatedProduct = await updateProductById(id, { name, description, qte });

        if (!updatedProduct) {
            console.log('Product not found');
            return res.sendStatus(404);
        }

        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.log('Error updating Product', error);
        return res.sendStatus(500);
    }
};

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedProduct = await deleteProductById(id);

        if (!deletedProduct) {
            console.log('Product not found');
            return res.sendStatus(404);
        }

        return res.status(204).end();
    } catch (error) {
        console.log('Error deleting Product', error);
        return res.sendStatus(500);
    }
}
