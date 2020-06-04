import Knex from 'knex';
// Os TIPOS no Tscript geralmente comecam com letra maiuscula.

export async function up(knex: Knex){
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable(); 
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();

    });
} 
// Função para que seja criado / alterado alguma coisa no banco. Ex(Criar a tabela)

export async function down(knex: Knex){
    return knex.schema.dropTable('points');
} 
// Para voltar atraz. (ex: Deletar a tabela criada)