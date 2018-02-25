
exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.createTable('Breweries', (table) => {

            table.increments('id').primary();
            table.string('name');
        }),
        knex.schema.createTable('Beers', (table) => {

            table.increments('id').primary();
            table.string('name');
            table.text('description');
            table.float('abv');
            table.integer('ibus');
            table.integer('breweryId')
                .references('id')
                .inTable('Breweries')
                .index();
        })
    ]);

};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('Beers'),
        knex.schema.dropTable('Breweries')
    ]);
};
