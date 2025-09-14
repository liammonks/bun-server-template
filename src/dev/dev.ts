import fs from "fs";
import path from "path";

let projectRoot = import.meta.dir;

while (true) {
	const packageJsonPath = path.join(projectRoot, "package.json");

	if (fs.existsSync(packageJsonPath)) {
		break;
	}

	const parentDir = path.dirname(projectRoot);

	if (parentDir === projectRoot) {
		console.error("[ package.json was not found in any parent directory of " + import.meta.dir + " ]");
		process.exit(1);
	}

	projectRoot = parentDir;
}

const buildPath = path.join(projectRoot, "build");
const staticPath = path.join(projectRoot, "static");
console.log("[ Watching for build changes at " + buildPath + " ]");
console.log("[ Watching for static changes at " + staticPath + " ]");

let serverProcess: Bun.Subprocess | null = null;
let serverRestartDebounceTimer: Timer | undefined;

const buildWatcher = fs.watch(
	buildPath,
	() => {
		if (serverRestartDebounceTimer) {
			clearTimeout(serverRestartDebounceTimer);
		}

		serverRestartDebounceTimer = setTimeout(() => {
			restartServer();
		}, 10);
	});

const staticWatcher = fs.watch(
	staticPath,
	() => {
		if (serverRestartDebounceTimer) {
			clearTimeout(serverRestartDebounceTimer);
		}

		serverRestartDebounceTimer = setTimeout(() => {
			restartServer();
		}, 10);
	});

async function spawnServer() {
	serverProcess = Bun.spawn(["bun", "server"], { stdout: "inherit", stderr: "pipe" });

	const stderr = serverProcess.stderr as ReadableStream<Uint8Array<ArrayBuffer>>;
	for await (const chunk of stderr) {
		const text = new TextDecoder().decode(chunk);
		if (text.includes("terminated by signal SIGTERM")) {
			continue;
		}
		console.write(text);
	}
}

async function restartServer() {
	if (serverProcess != null) {
		console.log("[ Change detected, restarting server... ]");
		serverProcess.kill();
		await serverProcess.exited;
	} else {
		console.log("[ Starting server process... ]");
	}
	spawnServer();
}

setTimeout(() => {
	if (serverProcess != null) { return; }
	console.log("[ Starting server process... ]");
	spawnServer();
}, 200);

console.log("[ Starting client build process... ]");
const buildProcess = Bun.spawn(["bun", "run", "build-dev"]);

process.on("SIGINT", () => {
	buildProcess.kill();
	buildWatcher.close();
	staticWatcher.close();
	if (serverProcess != null) {
		serverProcess.kill();
	}
	process.exit(0);
});
