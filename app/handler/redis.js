'use strict';

const
    globalConfig = require('../../config/config');
    redis   = require('redis');

const config = globalConfig[globalConfig.environment];

module.exports = {

    /**
     * Create Redis client
     *
     * @returns {Promise<any>}
     */
    getClient() {

        return new Promise((resolve, reject) =>  {
            const client = redis.createClient({
                host        : config.redis.host,
                port        : config.redis.port,
                password    : config.redis.password,
            })
                .on('connect', function() {
                    console.log('Redis client connected');

                    return resolve(client);
                })
                .on('error', function (error) {
                    console.log('Something went wrong ' + error);

                    return reject(error);
                });
        });
    },

};