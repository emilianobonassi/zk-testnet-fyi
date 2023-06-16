const Koa = require("koa");
const logger = require('koa-logger')
const parser = require("koa-bodyparser");
const cors = require("@koa/cors");
const router = require("./routes");

const app = new Koa();

app
  .use(logger())
  .use(parser())
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())
;

module.exports = app