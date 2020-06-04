import Knex from 'knex';
// Os TIPOS no Tscript geralmente comecam com letra maiuscula.

export async function up(knex: Knex){
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable(); 
    });
} 
// Função para que seja criado / alterado alguma coisa no banco. Ex(Criar a tabela)

export async function down(knex: Knex){
    return knex.schema.dropTable('items');
} 
// Para voltar atraz. (ex: Deletar a tabela criada)