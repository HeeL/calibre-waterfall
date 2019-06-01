const express = require("express");
const next = require("next");

const port = 3000;
const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/sites/:id", (req, res) => res.json({}));

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));
});
