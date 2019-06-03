const express = require("express");
const next = require("next");
const R = require("ramda");
require("dotenv").config();

const sites = require("./sites.json");
const routes = require("../routes.js");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();

  server.get("/api/sites/:slug", (req, res) => {
    const site = R.find(R.propEq("slug", req.params.slug))(sites);
    return res.json(site);
  });

  server.get("/api/sites", (req, res) => res.json(sites));

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, () => console.log(`Listening on port ${port}`));
});
