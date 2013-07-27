express = require \express
routes  = require \./routes
http    = require \http
path    = require \path
vowfs   = require \vow-fs

app = express!

app.set \port, process.env.PORT || 3000
app.set \views, __dirname + \/views
app.use express.favicon!
app.use express.logger \dev
app.use express.bodyParser!
app.use express.methodOverride!
app.use app.router
app.use express.static path.join __dirname, \public

Liquid = require \liquid-node
app.engine \.liquid, (filename, options, fn) ->
  console.log filename, options, fn
  vowfs.read filename
  .then (res) ->
    content = res.toString!
    template = Liquid.Template.parse content
    template.render options
  .then (res) ->
    fn null, res

if app.get \env == \development
  app.use express.errorHandler!

app.get \/, routes.index

app.listen app.get \port
