module.exports = {
    port: 8080,
    environment:"development",

    development: {
        dataResource: {
            URL: "http://betvictor.test",
            URI: "betvictor.json",
            fallbackLanguage: "en-gb",
        },
    },
    test: {
        dataResource: {
            URL: "http://betvictor.test",
            URI: "live/live/list",
            fallbackLanguage: "en-gb",
        },
    },
    production: {
        dataResource: {
            URL: "http://betvictor.test",
            URI: "live/live/list",
            fallbackLanguage: "en-gb",
        },

        redis: {
            host: "127.0.0.1",
            port: 6379,
            password: null,
        }
    },
};