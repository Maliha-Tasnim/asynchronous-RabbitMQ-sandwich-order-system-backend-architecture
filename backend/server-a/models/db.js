const mongoose = require('mongoose');

function connectDB(dbURL) {

    if (!mongoose.connection || mongoose.connection.readyState === 0) {
        mongoose
            .connect(dbURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                autoIndex: true
            })
            .then(() => {
                mongoose.connection.on('error', err => {
                    console.error(err);
                });

                mongoose.connection.on('connected', (data) => {
                    console.log("server-a: Successfully connected to Mongodb", data);
                });

                mongoose.connection.on('reconnectFailed', handleError);
            })
            .catch(handleError);
    }
}

function handleError(err) {
    console.error(err);
    throw err;
}

/**
 * Throws error on catch when connecting to Mongodb
 * 
 * @throws { Error } if unsuccessfull
 * @returns { void }
 * 
 */
function disconnectDB() {
    mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
