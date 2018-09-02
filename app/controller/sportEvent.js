'use strict';

const
    helper              = require('../helper/helper'),
    dataResource        = require('../handler/dataResource'),
    promisify           = require('util').promisify,
    redis               = require("redis"),
    {parse, stringify}  = require('flatted/cjs');

const
    client        = redis.createClient(),
    cacheGetAsync = promisify(client.get).bind(client),
    cacheSetAsync = promisify(client.set).bind(client);

module.exports = {

    /**
     * Method to list all sports
     *
     * @param req
     * @param res
     */
    getAllSports(req, res) {

        const searchItems = [{
            name: "sports"
        }];

        dataResource.getData(searchItems, getLanguage(req))
            .then(data => {

                // Obey the list order as per upstream API 'pos' property
                if (data) {
                    data.sort((a,b) => {
                        if (a.pos < b.pos)
                            return -1;
                        if (a.pos > b.pos)
                            return 1;
                        return 0;
                    });
                }

                return res.send(data || []);
            })
            .catch(error => {

                return helper.getErrorResponse(res, error);
            });
    },

    /**
     * Method to list all events for a given sport
     *
     * @param req
     * @param res
     */
    getAllSportEvents(req, res) {

        const searchItems = [{
            name: "sports",
            id: parseInt(req.params.sportId, 10),
        }];

        const cacheKey = `data_set_sports_${searchItems[0].id}`;

        cacheGetAsync(cacheKey)
            .then(cachedData => {
                if (cachedData) {
                    //console.log("GOT DATA FROM :: CACHE :: getAllSportEvents");

                    return res.send(parse(cachedData));
                } else {

                    dataResource.getData(searchItems, getLanguage(req))
                        .then(data => {

                            cacheSetAsync(cacheKey, stringify(data['events']))
                                .then(() => {
                                    return res.send(data['events'] || []);
                                })
                                .catch(error => {

                                    return helper.getErrorResponse(res, error);
                                });
                        })
                        .catch(error => {

                            return helper.getErrorResponse(res, error);
                        });
                }
            })
            .catch(error => {

                return helper.getErrorResponse(res, error);
            });
    },

    /**
     * Method to list all outcomes for a given event
     *
     * @param req
     * @param res
     */
    getAllEventOutcomes(req, res) {

        const searchItems = [
            {
                name: "sports",
                id: parseInt(req.params.sportId, 10),
            },
        ];

        const eventId = parseInt(req.params.eventId, 10);

        const cacheKey = `data_set_sports_${searchItems[0].id}_events_${eventId}`;

        cacheGetAsync(cacheKey)
            .then(cachedData => {
                if (cachedData) {
                    //console.log("GOT DATA FROM :: CACHE :: getAllEventOutcomes");

                    return res.send(parse(cachedData));
                } else {

                    dataResource.getData(searchItems, getLanguage(req))
                        .then(data => {

                            const events = data['events'];

                            helper.findObjectInArrayById(events, eventId)
                                .then(eventData => {

                                    cacheSetAsync(cacheKey, stringify(eventData['outcomes']))
                                        .then(() => {

                                            return res.send(eventData['outcomes'] || []);
                                        })
                                        .catch(error => {

                                            return helper.getErrorResponse(res, error);
                                        });
                                })
                                .catch(error => {

                                    return helper.getErrorResponse(res, error);
                                });
                        })
                        .catch(error => {

                            return helper.getErrorResponse(res, error);
                        });
                }
            })
            .catch(error => {

                return helper.getErrorResponse(res, error);
            });
    }

};

/**
 * Get language or fallback to default one
 *
 * @param req
 * @returns {string}
 */
function getLanguage(req) {

    return req.query.lang || helper.getFallbackLanguage();
}