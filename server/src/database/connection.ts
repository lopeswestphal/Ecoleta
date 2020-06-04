import knex from 'knex';
import path from 'path';


//A função path.resolve - Uni caminhos(Retornando eles de acordo com seus sistema operacional)
const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),  
    },

    useNullAsDefault: true,
})

export default connection;