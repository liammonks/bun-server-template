import { watch } from "fs";
import fs from "fs";
import path from "path";

function projectRoot(): string | null {
	let currentDir = import.meta.dir;

	while (true) {
		const packageJsonPath = path.join(currentDir, "package.json");

		if (fs.existsSync(packageJsonPath)) {
			return currentDir;
		}

		const parentDir = path.dirname(currentDir);

		if (parentDir === currentDir) {
			return null;
		}

		currentDir = parentDir;
	}
}

const rootDir = projectRoot();

if (rootDir == null) {
	console.error("package.json was not found in any parent directory of " + import.meta.dir);
	process.exit(1);
}

console.log("Watching files at " + rootDir);

const watcher = watch(
	rootDir,
	{ recursive: true },
	(event, filename) => {
		if (filename == null) {
			return;
		}

		if (filename.endsWith(".ts") || filename.endsWith(".html")) {
			console.log(`Detected ${event} in ${filename}`);
		}
	});

process.on("SIGINT", () => {
	console.log("Closing watcher...");
	watcher.close();

	process.exit(0);
});
