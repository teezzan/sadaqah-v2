import { Server } from "restify";
import pingRouter from "../controllers/user/routes";

const Routes = (server: Server) => {
  pingRouter.applyRoutes(server, "/api");
};

export default Routes;
