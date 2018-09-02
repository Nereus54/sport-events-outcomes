'use strict';

const
    helper       = require('../helper/helper'),
    dataResource = require('../handler/dataResource');

module.exports = {

    getAllSports(req, res) {

        const searchItems = [{
            name: "sports"
        }];

        dataResource.getData(searchItems, req.query.lang || null)
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
                global.logger.error(error);
                console.log(error);

                return res.sendStatus(400);
            });
    },

    getAllSportEvents(req, res) {

        const searchItems = [{
            name: "sports",
            id: parseInt(req.params.sportId, 10),
        }];

        dataResource.getData(searchItems, req.query.lang || null)
            .then(data => {

                return res.send(data['events'] || []);
            })
            .catch(error => {
                global.logger.error(error);
                console.log(error);

                return res.sendStatus(400);
            });
    },

    getAllEventOutcomes(req, res) {

        const lang = req.query.lang || null;

        const searchItems = [
            {
                name: "sports",
                id: parseInt(req.params.sportId, 10),
            },
        ];

        const eventId = parseInt(req.params.eventId, 10);

        dataResource.getData(searchItems, lang)
            .then(data => {

                const events = data['events'];

                helper.findObjectInArrayById(events, eventId)
                    .then(eventData => {
                        return res.send(eventData['outcomes'] || []);
                    })
                    .catch(error => {
                        return res.status(400).send(error);
                    });
            })
            .catch(error => {
                global.logger.error(error);
                console.log(error);

                return res.sendStatus(400);
            });
    }

};