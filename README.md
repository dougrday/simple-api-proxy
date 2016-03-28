# Simple API Proxy

This is a simple web API proxy, which can be used to forward API calls from one URI to another,
through the node Express web server.  I've used this in personal projects to avoid issues with
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS), especially in
proof-of-concept designs or quickstarters.

If you see this error in Chrome, this project may help you:
![alt tag](docs/img/cors.png)

# Prerequisites

Ensure Node v5 or later is installed.  See [nodejs.org](https://nodejs.org/en/).

# Installation

Run `npm install`

# Running the proxy server

Run `npm start -- --proxy=http://path/to/api`

Note the `--` option is present to correctly pass parameters to the node script.

For more complex options, the following parameters are available:

`--path=/local/path/to/forward/to/api/*` - Defaults to `/*` to forward all calls.
`--proxy=http://path/to/api` - Required, the path to the web API that you're proxying.
`--port=3002` - Defaults to 3002, the port assigned to the proxy.

## For example:

Running `npm start -- --proxy=http://mywebsite.com/api --port=60001 --path=/api/*` would:

1.  Start the proxy server at port 60001.
2.  Forward all calls starting with http://localhost:60001/api to http://mywebsite.com/api.
