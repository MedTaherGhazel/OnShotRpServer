import express from 'express';
import {  addProduct, deleteProduct, getAllProducts, getProductBId, updateProduct } from '../controllers/products';
import { isAdmin } from '../middlewares';


export default (router: express.Router) => {
       router.get('/products', getAllProducts);
       router.get('/products/:id', getProductBId);
       router.post('/products', addProduct);
       router.put('/products/:id', updateProduct);
       router.delete('/products/:id', deleteProduct);

};
