# Configuration

global.config = {
  LOG_LEVEL: "info",
  LISTEN_PORT: 8888,
  DB_SHOPS_URL: "mongodb://127.0.0.1:27017/shops",
  SHOPS_COLLECTION: "shops"
}

global._            = require 'underscore'
global.Async        = require 'async'
global.Step         = require 'step'
global.logger       = new (require './logger')("easydian")
global.mongoose     = require 'mongoose'
