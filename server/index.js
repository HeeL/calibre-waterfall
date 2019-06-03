const express = require("express");
const next = require("next");
const R = require("ramda");
const sites = require("./sites.json");
require("dotenv").config();

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.get("/api/sites/:slug", (req, res) => {
    const site = R.find(R.propEq("slug", req.params.slug))(sites);
    return res.json(site);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));
});
