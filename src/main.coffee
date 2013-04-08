require './easydian/config'

console.log "main...."
console.log "easydian"

Server = require './easydian/server'
new Server().start()