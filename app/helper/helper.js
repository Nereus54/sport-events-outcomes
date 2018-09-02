'use strict';

const
    async        = require('async'),
    globalConfig = require('../../config/config');

const config = globalConfig[globalConfig.environment];

module.exports = {

    /**
     *
     * @param language
     * @returns {string}
     */
    getDataResourceURL(language) {

        const lang = (typeof language === "string" && language.length > 0)
            ? language
            : config.dataResource.fallbackLanguage;

        return `${config.dataResource.URL}/${lang}/${config.dataResource.URI}`;
    },

    /**
     *
     * @param data
     * @param id
     * @returns {Promise<any>}
     */
    findObjectInArrayById(data, id) {

        return new Promise((resolve, reject) => {

            async.forEach(data, (item, cb) => {

                if (item.id === id) {

                    return resolve(item);
                } else {
                    cb();
                }

            }, (error) => {
                if (error) {
                    return reject(error);
                }

                return resolve([]);
            });
        });
    },

    /**
     * Get fallback language from config
     *
     * @returns {string}
     */
    getFallbackLanguage() {

        return config.dataResource.fallbackLanguage || "";
    },

};