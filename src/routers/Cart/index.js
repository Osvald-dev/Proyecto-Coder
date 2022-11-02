import { Router } from "express";
import {DATE_UTILS} from '../../utils/date-utils.js';
import {CartDao, ProductDao} from '../../Dao/index.js';


const router = Router();

router.post('/', async (req, res)=>{
   try {
    const cart = {timestamp: DATE_UTILS.getTimestamp(), products: []}
    const carts = await CartDao.save(cart)
    res.send({sucess: true, cartId: carts.id})
   } catch (error) {
    res.send(error);
   }
})  

router.post ('/:cartId/productos', async (req, res)=>{
  try {
    const { productId } = req.body;
    const { cartId } = req.params;
    const cart = await CartDao.getById(Number(cartId));
    if (!cart)
      return res.send({ error: true, message: "Error: Cart doesn't exist" });
    const product = await ProductDao.getById(Number(productId));
    if (!product)
      return res.send({ error: true, message: "Error: Product doesn't exist" });
    

    cart.products.push(product);
    
    const updatedCart = await CartDao.updateById(Number(cartId), cart);
    res.send({ success: true, cart: updatedCart });
  } catch (error) {
    res.send({success: error, message: "No se puede agregar el producto al carrito"})
  }
});
    
router.get('/:cartId/productos', async (req, res)=>{
  try {
    const {cartId} = req.params;
    const cart = await CartDao.getById(Number(cartId));

    if (!cart) res.send({error: true, message:'cart selected does not exit'})
    if(cart.products.length == 0) res.send({succes:true, carrito: cart, productosCarrito: 'No hay productos cargados en carrito'})
    res.send({succes: true, productosCarrito: cart.products, carritoID: cart.id})
  } catch (error) {
    res.send({error:true , message: 'no existe'})
  }
});

router.delete('/:cartId', async(req, res)=>{
  try {
    const {cartId} = req.params;

    const cart = await CartDao.getById(Number(cartId));
    if(cart == null) res.send({succes:true, message:'No existe el carrito que desea eliminar'})
    const deleteCart = await CartDao.deleteById(cart.id);
    res.send({succes: true, message: `CartId delet : ${cartId}`})
  } catch (error) {
      console.log(error)
  }

})

router.delete('/:cartId/productos/:id_prod', async(req, res)=>{
  try {
    const {cartId, id_prod} = req.params;
    const cart = await CartDao.getById(Number(cartId));
    
    if(!cart) res.send({error:true, message:"Cart does not exist"})
    
    const product = await ProductDao.getById(Number(id_prod));
    if(!product) res.send({error:true, message:"No existe el producto"})
   
    const foundElement = cart.products.findIndex(element => element.id == id_prod)
    if(foundElement === -1) res.send({error:true, message:'no existe el producto dentro del carrito'})
    cart.products.splice(foundElement, 1)
    // const deleteProduct = await CartDao.deleteById(product.id);
    // res.send({succes: true, deleteProductoID: deleteProduct});
    
    const updateCart = await CartDao.updateById(Number(cartId), cart)
    res.send({succes: true, cart: updateCart})
  } catch (error) {
    console.log(error);
  }
})

export {router as CartRouter};