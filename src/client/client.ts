console.log("client script loaded");

const websocketLocation = "ws://localhost:3000";
const socket = new WebSocket(websocketLocation);

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

if (process.env.NODE_ENV === "development") {
	let reconnectSocket: WebSocket | null;
	let reconnectDelay = 10;
	let isUnloading = false;
	const maxReconnectDelay = 1000;

	window.addEventListener("beforeunload", () => {
		isUnloading = true;
	});

	socket.addEventListener("close", event => {
		if (reconnectSocket == null && !isUnloading) {
			attemptReconnect();
		}
	});

	function attemptReconnect() {
		if (reconnectSocket != null) {
			return;
		}
		console.log("attemping reconnection to websocket server");
		reconnectSocket = new WebSocket(websocketLocation);
		reconnectSocket.onopen = () => {
			window.location.reload();
		};
		reconnectSocket.onclose = () => {
			if (isUnloading) { return; }
			setTimeout(() => {
				console.log("reconnection retry in " + reconnectDelay + "ms");
				reconnectSocket = null;
				attemptReconnect();
			}, reconnectDelay)
			reconnectDelay = Math.min(reconnectDelay * 2, maxReconnectDelay);
		};
	}
}
