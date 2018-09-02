'use strict';

const
    async = require('async'),
    axios = require('axios'),
    helper = require('../helper/helper');

module.exports = {

    /**
     *
     * @param language
     * @returns {Promise<any>}
     */
    getResourceData(language = '') {

        return new Promise((resolve, reject) => {

            axios.get(helper.getDataResourceURL(language))
                .then(response => {

                    return resolve(response);
                })
                .catch(error => {
                    return reject(error);
                })
        });
    },

    /**
     *
     * @param searchNodes array of search objects in the as same order as they are nested
     * @param language
     * @returns {Promise<any>}
     */
    getData(searchNodes = [], language = '') {

        return new Promise((resolve, reject) => {

            this.getResourceData(language)
                .then(response => {
                    const data = response['data'];

                    if (!data) {

                        return reject("Could not fetch any data!");
                    }

                    // return all data
                    if (!Array.isArray(searchNodes) || searchNodes.length === 0) {

                        return resolve(data);
                    }

                    resolveData(data, searchNodes[0])
                        .then(result => {
                            return resolve(result);
                        })
                        .catch(error => {
                            return reject(error);
                        });
                })
                .catch(error => {
                    return reject(error);
                });
        });
    },

    getFromPassedData(searchNodes = [], data = []) {

        return new Promise((resolve, reject) => {

            if (!data) {

                return reject("Could not process empty data!");
            }

            // return all data
            if (!Array.isArray(searchNodes) || searchNodes.length === 0) {

                return resolve(data);
            }

            resolveData(data, searchNodes[0])
                .then(result => {
                    return resolve(result);
                })
                .catch(error => {
                    return reject(error);
                });
        });
    }

};

/**
 *
 * @param data
 * @param node
 * @returns {Promise<any>}
 */
function resolveData(data, node) {

    return new Promise((resolve, reject) => {

        async.forEachOf(data, (subSet, key, cb) => {

            if (key === node.name) {

                if (node.id > 0) {
                    helper.findObjectInArrayById(subSet, node.id)
                        .then(result => {
                            return resolve(result);
                        })
                        .catch(error => {
                            return reject(error);
                        });

                } else {
                    return resolve(subSet);
                }
            } else {
                cb();
            }

        }, (error) => {
            if (error) {
                return reject(error);
            }

            return resolve(data);
        });
    });
}