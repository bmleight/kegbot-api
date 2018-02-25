'use strict';

const Model = require('schwifty').Model;
const Joi = require('joi');

module.exports = class Beers extends Model {

    static get tableName() { return 'Beers'; }           // eslint-disable-line

    static get joiSchema() {

        return Joi.object({
            id: Joi.number(),
            breweryId: Joi.number().allow(null),
            name: Joi.string(),
            description: Joi.string(),
            abv: Joi.number(),
            ibus: Joi.number(),
            description: Joi.string()
        });
    }

    static get relationMappings() {

        return {
            brewery: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./Breweries'),
                join: {
                    from: 'Beers.breweryId',
                    to: 'Breweries.id'
                }
            }
        };
    }
};
