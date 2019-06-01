const express = require("express");
const next = require("next");

const port = 3000;
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/sites/:id", (req, res) => res.json({}));

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));
});
