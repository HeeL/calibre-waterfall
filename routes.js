const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.add("sites", "/sites/:slug");
routes.add("snapshots", "/sites/:slug/snapshots/:id");
