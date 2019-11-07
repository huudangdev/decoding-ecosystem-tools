require('dotenv').config();

module.exports = {
    serviceName: 'auth',
    authSecret: process.env.AUTH_SECRET,
    mongoUrl: process.env.MONGO_URI,
    PORT: 8080,
}