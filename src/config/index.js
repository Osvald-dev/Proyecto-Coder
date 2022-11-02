
import dotenv from 'dotenv';

dotenv.config();

//nombres de los Json que almacenarán los datos
const PRODUCTS_FILENAME = 'products';
const CARTS_FILENAME = 'carts';

const config = {
    SERVER: {
        PORT: process.env.PORT || 8080,
    },
    DATABASES: {
        filesystem:{
            PRODUCTS_FILENAME,
            CARTS_FILENAME,
        }

    }
}


export {config};