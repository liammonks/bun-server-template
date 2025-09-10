# bun-server-template

1. [Install Bun](https://bun.sh/docs/installation)

2. Navigate to project directory, then install dependencies:

```bash
bun install
```

3. Build the client typescript file(s) into a javascript bundle, placing the output inside the build folder:

```bash
bun build ./src/client.ts --outdir build
```

4. Run the server

```bash
bun run ./src/server.ts
```

5. Alternatively, use the "serve" script to run steps 3 and 4 in succession. (see package.json for implementation)

```bash
bun serve
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
