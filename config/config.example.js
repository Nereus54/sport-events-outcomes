module.exports = {
    port: 8080,
    environment:"production",
    development: {
        username: "example_user",
        password: "secret",
        database: "example_db",
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres",
        operatorsAliases: false,
        quoteIdentifiers: true,
        define: {
            underscored: true,
            freezeTableName: true,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: true
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
    test: {
        username: "example_user",
        password: "secret",
        database: "example_db",
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres",
        operatorsAliases: false,
        quoteIdentifiers: true,
    },
    production: {
        username: "example_user",
        password: "secret",
        database: "example_db",
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres",
        operatorsAliases: false,
        quoteIdentifiers: true,
        define: {
            underscored: true,
            freezeTableName: false,
            charset: 'utf8',
            dialectOptions: {
                collate: 'utf8_general_ci'
            },
            timestamps: true
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    },
};