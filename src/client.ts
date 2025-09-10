console.log("client script loaded");

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("message", event => {
	console.log("websocket message received: " + event.data);
});

socket.addEventListener("open", event => {
	console.log("websocket connected, sending ping to server...");
	socket.send("ping!");
});

socket.addEventListener("close", event => {
	console.log("websocket disconnected");
});

socket.addEventListener("error", event => {
	console.log("websocket error received: " + event.type);
});

