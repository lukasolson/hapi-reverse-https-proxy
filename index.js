var readFile = require("fs").readFileSync;
var Hapi = require("hapi");

var server = new Hapi.Server();
server.connection({
	host: "localhost",
	port: 3000,
});

server.route({
	method: '*',
	path: "/{path*}",
	handler: {
		proxy: {
			mapUri: function (request, callback) {
				var url = "http://localhost:5601/" + request.paramsArray.join("/");
				callback(null, url);
			},
			passThrough: true,
			xforward: true
		}
	}
});

server.start();
