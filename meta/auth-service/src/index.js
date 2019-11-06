const cors = require("micro-cors");
const { router, get, post, put, withNamespace } = require("microrouter");
const config = require("./config");
const userRoute = require("./routes/user");

const namespace = withNamespace(`/${config.serviceName}`);

module.exports = cors(router(namespace()));
