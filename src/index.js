import express from 'express';
import { ProductRouter } from './routers/index.js';
import {CartRouter} from './routers/Cart/index.js'
import {config} from './config/index.js'

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', ProductRouter);
app.use('/api/carrito', CartRouter);




const server = app.listen(config.SERVER.PORT, () =>
  console.log(`Server running on port ${server.address().port}`)
);