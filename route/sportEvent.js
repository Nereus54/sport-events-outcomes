'use strict';

const
    controller = require('../app/controller');

module.exports = app => {

    app.get('/api/v1/sports', controller.SportEvent.getAllSports);

    app.get('/api/v1/sports/:sportId', controller.SportEvent.getAllSportEvents);

    app.get('/api/v1/sports/:sportId/events/:eventId', controller.SportEvent.getAllEventOutcomes);

};