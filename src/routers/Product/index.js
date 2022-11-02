import { Router} from 'express'
import { ProductDao } from '../../Dao/index.js';
import {DATE_UTILS, JOI_VALIDATOR} from '../../utils/index.js';
import { admin } from '../../middlewares/verify-hack.js';

const router = Router();

router.get('/', async (req, res)=>{
  try {
    const product = await ProductDao.getAll();
    res.send(product);
  } catch (error) {
    res.send(error);
  }
    
})
router.get('/:id', async (req, res)=>{
 try {
  const {id} = req.params;
  const product = await ProductDao.getById(Number(id));
  res.send(product);

 } catch (error) {
  console.error(error);
 }
})

router.post('/', admin, async (req, res)=>{
  try {
    const {title, description, code, thumbnail, price, stock} = req.body;
    const product = await JOI_VALIDATOR.product.validateAsync( {title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimestamp()});
    const createProduct = await ProductDao.save(product);
    res.send({succes: true, productoAgregado: createProduct});

  } catch (error) {
    res.send(error);
  }
})

router.put('/:id', admin, async (req, res)=>{
  try {
    const {id} = req.params;
    const {title, description, code, thumbnail, price, stock} = req.body;
    const updateProduct = await ProductDao.updateById(id, {title, description, code, thumbnail, price, stock})
    res.send({ success: true, data: { updated: updateProduct } });
  } catch (error) {
    res.send(error)
  }
})

router.delete('/:id', admin, async(req, res)=>{
  try {
    const {id}= req.params;
    const product = req.body;
    const deleteById = await ProductDao.deleteById(Number(id));
    res.send({ success: true, data: { delete: product }});
  } catch (error) {
    res.send(error)
  }
})

export {router as ProductRouter};

