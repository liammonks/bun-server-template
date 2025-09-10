# bun-server-template

[Install Bun](https://bun.sh/docs/installation)


Navigate to project directory, then install dependencies:

```bash
bun install
```


Build the client typescript file(s) into a javascript bundle, placing the output inside the build folder:

```bash
bun build ./src/client.ts --outdir build
```


Run the server

```bash
bun run ./src/server.ts
```


Alternatively, use the "serve" script to build the client and run the server in succession. (see package.json for implementation)

```bash
bun serve
```


This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
