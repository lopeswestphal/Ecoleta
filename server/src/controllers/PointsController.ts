import {Request, Response} from 'express';
import Knex from '../database/connection';

class PointsController{
    async index(request: Request, response: Response){
        //sempre que utilizar o query e bom informar o formato, porque ele pode vim qualquer coisa.
        const { city, uf, items } = request.query;

        //.trim -> remove os espaçamentos.
        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await Knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            const serializedPoints = points.map(point => {
                return {
                    ...point,
                    image_url: `http://192.168.15.6:3333/uploads/${point.image}`
                };
            })
 
        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const point = await Knex('points').where('id', id).first();

        if (!point) {
            //400 - Erro do usuario.
            return response.status(400).json({ message: 'Point not found.' }); 
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.15.6:3333/uploads/${point.image}`
        };

        /**
         * SELECT * FROM items
         * JOIN point_items on items.id = point_items.item_id
         * where point_items.item_id = {id}
         */

        const items = await Knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point: serializedPoint , items });
    }

    async create(request: Request, response: Response) {
        // Recurso de desestruturação do JavaScript, criando varias variaveis.
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        // TRX nao executa uma transação caso o segundo ou a primeira falhe
        const trx = await Knex.transaction();
    
        //Quando o nome da variavel e igual do objeto se pode omitir. (Ex: name: name,)
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
        
        const insertedIds = await trx('points').insert(point);
        
        const point_id = insertedIds[0];
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
            });

        await trx('point_items').insert(pointItems);

        // Sempre quando for usar o transction no final ele nao faz os insert se nao tiver o commit.
        await trx.commit();

        return response.json({
            // Pegar todas as informaçoes de um objeto e retornar dentro de outro.
            id: point_id, 
            ...point
        });
    }
};
 
export default PointsController;