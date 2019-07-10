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
      .then(R.slice(0, 3))
      .then(R.filter(R.propEq("status", "completed")))
      .then(async snapshots => {
        for (let i = 0; i < snapshots.length; i++) {
          const snapshot = snapshots[i];
          const snapshotDetails = await fetch(
            `${snapshot.url}?api_key=${process.env.CALIBRE_API_TOKEN}`
          ).then(result => result.json());
          snapshots[i] = R.merge(snapshot, { snapshotDetails });
        }
        return snapshots;
      })
      .then(
        R.map(snapshot => {
          const date = new Date(snapshot.created_at);
          return {
            id: snapshot.id,
            created_at: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
            profiles: R.uniqBy(
              R.prop("id"),
              R.map(R.pickAll(["id", "name", "endpoint"]))(
                snapshot.snapshotDetails.pages
              )
            )
          };
        })
      )
      .then(snapshots => res.json(snapshots));
  });

  server.get("/api/har/:slug/:snapshot_id", (req, res) => {
    const urlFetchSnapshots = `${process.env.CALIBRE_API_HOST}/api/sites/${
      req.params.slug
    }/snapshots/${req.params.snapshot_id}?api_key=${
      process.env.CALIBRE_API_TOKEN
    }`;
    const profile_name = req.query.mobile
      ? "MotoG4, 3G connection"
      : "Chrome Desktop";
    return fetch(urlFetchSnapshots)
      .then(result => result.json())
      .then(result =>
        R.find(
          page =>
            req.query.profile_id === page.id && page.profile === profile_name
        )(result.pages)
      )
      .then(R.path(["artifacts", "har"]))
      .then(result => res.json({ harUrl: result }));
  });

  server.get("/api/sites", (req, res) => res.json(sites));

  server.get("*", (req, res) => handle(req, res));

  server.listen(port, () => console.log(`Listening on port ${port}`));
});
