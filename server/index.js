const express = require("express");
const next = require("next");
const R = require("ramda");
const fetch = require("isomorphic-unfetch");

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

  server.get("/api/snapshots/:slug", (req, res) => {
    const urlFetchSnapshots = `${process.env.CALIBRE_API_HOST}/api/sites/${
      req.params.slug
    }/snapshots?api_key=${process.env.CALIBRE_API_TOKEN}`;
    return fetch(urlFetchSnapshots)
      .then(result => result.json())
      .then(R.filter(R.propEq("status", "completed")))
      .then(R.map(R.pickAll(["id", "created_at"])))
      .then(snapshots => res.json(snapshots));
  });

  server.get("/api/sites", (req, res) => res.json(sites));

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, () => console.log(`Listening on port ${port}`));
});
