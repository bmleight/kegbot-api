'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = (server, options) => {

    return [
        // - Basic CRUD -
        {
            method: 'GET',
            path: '/beers/{id}',
            config: {
                description: 'Get a beer',
                tags: ['api'],
                validate: {
                    params: {
                        id: Joi.any().required()
                    }
                },
                auth: false
            },
            handler: function (request, reply) {

                const Beers = request.models().Beers;

                Beers.query().findById(request.params.id).asCallback((beerErr, foundBeer) => {

                    if (beerErr) {
                        return reply(Boom.wrap(beerErr));
                    }
                    if (!foundBeer) {
                        return reply(Boom.notFound('Beer not found.'));
                    }

                    reply(foundBeer);
                });
            }
        },
        {
            method: 'GET',
            path: '/beers',
            config: {
                description: 'Get all beers',
                tags: ['api'],
                auth: false
            },
            handler: (request, reply) => {

                const Beers = request.models().Beers;

                Beers.query().asCallback((schoolErr, foundBeer) => {

                    if (schoolErr){
                        return reply(Boom.wrap(schoolErr));
                    }

                    return reply(foundBeer);
                });
            }
        },
        {
            method: 'GET',
            path: '/beers/on-tap',
            config: {
                description: 'Get all beers on tap',
                tags: ['api'],
                auth: false
            },
            handler: (request, reply) => {

                return reply([{
                    id: 1,
                    name: 'CloneZone IPA',
                    abv: 6.3,
                    ibus: 79,
                    description: 'Galaxy and Mosaic hops contributes delicious citrusy and tropical flavor. Pleasantly hoppy with a dry finish that makes it endlessly enjoyable.',
                    image_url: '',
                    type: 'home-brew',
                    brewery: {
                        name: 'Brother\'s basement',
                        image_url: ''
                    },
                    clone_beer: {
                        name: 'Ozone IPA',
                        image_url: '',
                        brewery: {
                            name: 'Orono Brewing Company',
                            image_url: ''
                        }
                    }
                }]);

                const Beers = request.models().Beers;

                Beers.query().asCallback((schoolErr, foundBeer) => {

                    if (schoolErr){
                        return reply(Boom.wrap(schoolErr));
                    }

                    return reply(foundBeer);
                });
            }
        },
        {
            method: 'POST',
            path: '/beers',
            config: {
                tags: ['api'],
                description: 'Register new beer',
                validate: {
                    payload: {
                        name: Joi.string().required(),
                        description: Joi.string(),
                        breweryId: Joi.number(),
                        abv: Joi.number(),
                        ibus: Joi.number(),
                        description: Joi.string()
                    }
                },
                auth: false//TODO lock down, but leave for dev
            },
            handler: (request, reply) => {

                const Beers = request.models().Beers;

                Beers.query().insert(request.payload)
                .asCallback((error, newBeer) => {

                    if (error){
                        return reply(Boom.wrap(error));
                    }
                    return reply().code(201);
                });
            }
        }
    ];
};
