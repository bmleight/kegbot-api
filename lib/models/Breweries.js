'use strict';

const Model = require('schwifty').Model;
const Joi = require('joi');

module.exports = class Breweries extends Model {

    static get tableName() { return 'Breweries'; }           // eslint-disable-line

    static get joiSchema() {

        return Joi.object({
            id: Joi.number(),
            name: Joi.string()
        });
    }

};
