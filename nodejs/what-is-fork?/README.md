# What is fork() in Node.js?

We will multiple instance of a Node.js server using `fork()`.

```js
import { createServer } from 'node:http';
import cluster from 'node:cluster';
import os from 'node:os';
import express from "express";
import { config } from "dotenv";
import routerV1 from "./routerV1.js";

config();

const app = express();
const cpus = os.cpus();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", router);

function handleExit() {
  cluster.fork();
}

function handleConnection() {
  console.log(`Application started on port: ${process.env.PORT}`);
}

if (cluster.isPrimary) {
  cpus.forEach(() => {
    cluster.fork();
  });

  cluster.on("exit", handleExit);
} else {
  const server = createServer(app);
  server.listen(process.env.PORT, handleConnection);
}
```