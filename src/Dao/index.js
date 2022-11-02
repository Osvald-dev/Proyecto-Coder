import { ContainerFilesystem } from "../Containers/index.js";
import { config } from '../config/index.js';


const ProductDao = new ContainerFilesystem(config.DATABASES.filesystem.PRODUCTS_FILENAME);
const CartDao = new ContainerFilesystem(config.DATABASES.filesystem.CARTS_FILENAME);

export{ ProductDao, CartDao };