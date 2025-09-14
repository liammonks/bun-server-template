const html = Bun.file("./static/index.html");
const js = Bun.file("./build/bundle.js");

Bun.serve({
	port: 3000,
	fetch(request, server) {
		const url = new URL(request.url);

		if (server.upgrade(request)) {
			console.log("a client has been upgraded to a websocket connection");
			return;
		}

		if (url.pathname === "/") {
			console.log("sending html to client");
			return new Response(html);
		}

		if (url.pathname === "/bundle.js") {
			console.log("sending js to client");
			return new Response(js);
		}

		return new Response("Not found", { status: 404 });
	},
	websocket: {
		open(ws) {
			console.log("websocket connected");
		},
		message(ws, message) {
			console.log("websocket message received: " + message);

			if (message == "ping!") {
				console.log("sending pong to server");
				ws.send("pong!");
			}
		},
		close(ws) {
			console.log("websocket closed");
		}
	}
});

console.log("server running on http://localhost:3000");
