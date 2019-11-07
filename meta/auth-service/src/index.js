const cors = require("micro-cors");
const { router, get, post, put, withNamespace } = require("microrouter");
const config = require("./config");
const userRoute = require("./routes/user");
const express = require('express');
const mongoose = require('mongoose');

const namespace = withNamespace(`/${config.serviceName}`);
const app = express();
const PORT = config.PORT || 8080;

const db = config.mongoUrl;
console.log(db);
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('DB connected')})
    .catch((err) => {console.log({msg: err})});

app.listen(PORT, () => {
    console.log('Server is running at PORT' + PORT);
})

module.exports = cors(router(namespace()));

