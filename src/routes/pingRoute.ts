import { Router } from "restify-router";

import { pingAndGetOKResponse } from "../controllers/PingController";
import { authentication } from "../middleware/Auth";

var PingRouter = new Router();

PingRouter.get("/ping", authentication, pingAndGetOKResponse);

export default PingRouter;
