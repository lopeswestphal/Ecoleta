import Knex from 'knex';
// Os TIPOS no Tscript geralmente comecam com letra maiuscula.

export async function up(knex: Knex){
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();

        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('points');
        
        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items'); 
    });
} 
// Função para que seja criado / alterado alguma coisa no banco. Ex(Criar a tabela)

export async function down(knex: Knex){
    return knex.schema.dropTable('point_items');
} 
// Para voltar atraz. (ex: Deletar a tabela criada)