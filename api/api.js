var express = require("express");
var color = require("colors");
var bodyParser = require("body-parser");
var routes = require("./routes");
var request = require("request");
var minimist = require("minimist");

var app = express();

// Parse command-line arguments
var args = minimist(process.argv.slice(1));
var port = args.port || 3002;
var proxyPath = args.path || "/*";
var proxy = args.proxy;

if (!proxy) {
    console.log("Missing --proxy parameter!".red);
    console.log("Please provide the path to the server to proxy using `--proxy=http://path/to/api`.");
    return;
}
if (!proxyPath || proxyPath.length === 0) {
    console.log("An invalid proxy path was provided!".red);
    console.log("Please provide the proxy path using `--path=/local/api/path/*`.");
    return;
}

// Proxy API calls to another API server
// that doesn"t allow CORS.
//npm i
app.all(proxyPath, function(req, res) {
    if (req.method === "OPTIONS") {
        // Special handlers for OPTIONS requests proxied through to another API server:
        // set header to handle the CORS
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
        res.header("Allow", "PUT, POST, GET, DELETE, OPTIONS");
        res.status(200).send("PUT, POST, GET, DELETE, OPTIONS");
    }
    else {
        var url = proxy + req.url;
        req.pipe(request(url)).on("response", function(res) {
            res.headers["Access-Control-Allow-Origin"] = "*";
            res.headers["Access-Control-Allow-Headers"] = "Content-Type, Content-Length, Authorization, Accept, X-Requested-With";
        }).pipe(res);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
    next();
});

app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

app.listen(port, function () {
    console.log(("API server listening on port " + port + ".").green)
});

module.exports = app;
