import { Server } from "restify";
import pingRouter from "./pingRoute";

const Routes = (server: Server) => {
  pingRouter.applyRoutes(server, "/api");
};

export default Routes;
