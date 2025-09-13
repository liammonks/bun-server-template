import html from "../../static/index.html"

const server = Bun.serve({
	routes: {
		"/": html,
	},
	fetch(req, server) {
		server.upgrade(req);
	},
	websocket: {
		open(ws) {
			console.log("websocket connected");
		},

		message(ws, message) {
			console.log("websocket message: " + message);

			if (message == "ping!") {
				ws.send("pong!");
			}
		},

		close(ws, code, message) {
			console.log("websocket disconnected");
		},
	},
	development: {
		hmr: false
	}
});

console.log(`server running on ${server.url}`);
