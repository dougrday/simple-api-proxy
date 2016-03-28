# Simple API Proxy

This is a simple web API proxy, which can be used to forward API calls from one URI to another,
through the node Express web server.  I've used this in personal projects to avoid issues with
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS), especially in
proof-of-concept designs or quickstarters.

# Prerequisites

Ensure Node v5 or later is installed.  See [nodejs.org](https://nodejs.org/en/).

# Installation

Run `npm install`

# Running the proxy server

Run `npm start --proxy=http://path/to/api`
