'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = (server, options) => {

    return [
        // - Basic CRUD -
        {
            method: 'GET',
            path: '/breweries/{id}',
            config: {
                description: 'Get a brewery',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.any().required()
                    }
                },
                auth: false
            },
            handler: function (request, reply) {

                const Breweries = request.models().Breweries;

                Breweries.query().findById(request.params.id).asCallback((breweryErr, foundBrewery) => {

                    if (breweryErr) {
                        return reply(Boom.wrap(breweryErr));
                    }
                    if (!foundBrewery) {
                        return reply(Boom.notFound('Brewery not found.'));
                    }

                    reply(foundBrewery);
                });
            }
        },
        {
            method: 'GET',
            path: '/breweries',
            config: {
                description: 'Get all breweries',
                tags: ['api'],
                auth: false
            },
            handler: (request, reply) => {

                const Breweries = request.models().Breweries;

                Breweries.query().asCallback((breweryErr, foundBrewery) => {

                    if (breweryErr){
                        return reply(Boom.wrap(breweryErr));
                    }

                    return reply(foundBrewery);
                });
            }
        },
        {
            method: 'POST',
            path: '/breweries',
            config: {
                tags: ['api'],
                description: 'Register new brewery',
                validate: {
                    payload: {
                        name: Joi.string().required()
                    }
                },
                auth: false//TODO lock down, but leave for dev
            },
            handler: (request, reply) => {

                const Breweries = request.models().Breweries;

                Breweries.query().insert(request.payload)
                .asCallback((error, newBrewery) => {

                    if (error){
                        return reply(Boom.wrap(error));
                    }
                    return reply().code(201);
                });
            }
        }
    ];
};
