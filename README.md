# bun-server-template

This branch includes a development script which builds the client code and will re-build when client code changes are detected. The script also launches the server, and will restart the server when any server code changes are detected. Client code built by this script, and by running "bun run build-dev", will include automatic reloading of the webpage when server restarts.


[Install Bun](https://bun.sh/docs/installation)


Navigate to project directory, then install dependencies:

```bash
bun install
```


Run the dev script to build the client and launch the server with auto reloading:

```bash
bun run dev
```


Build the client for production, stripping code for auto page reloading:

```bash
bun run build
```


This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
