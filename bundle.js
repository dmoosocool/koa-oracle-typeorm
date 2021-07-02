'use strict';

require('reflect-metadata');
var typeorm = require('typeorm');
var Koa = require('koa');
var Router = require('koa-router');
var cors = require('koa-cors');
var bodyParser = require('koa-bodyparser');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Koa__default = /*#__PURE__*/_interopDefaultLegacy(Koa);
var Router__default = /*#__PURE__*/_interopDefaultLegacy(Router);
var cors__default = /*#__PURE__*/_interopDefaultLegacy(cors);
var bodyParser__default = /*#__PURE__*/_interopDefaultLegacy(bodyParser);

typeorm.createConnection().then(async (connection) => {
  const app = new Koa__default['default']();
  const router = new Router__default['default']();
  app.use(bodyParser__default['default']());
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(cors__default['default']());
  app.listen(3e3);
  console.log(`Koa application is up and runing on http://0.0.0.0:3000`);
}).catch((error) => console.log(`TypeORM connection error:`, error));
