import {Request, Response} from 'express';
import Knex from '../database/connection';

class ItemsController{
    async index(request: Request, response: Response) {
    //Sempre que for fazer uma quiue para o BD e bom usar o A.A, para esperar a queue terminar.
    const items = await Knex('items').select('*');
    
    // O Processo de transformação de dados se chama Serialização de dados(Serialized).
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        };
    })
    
    return response.json(serializedItems);
    }
}

export default ItemsController;