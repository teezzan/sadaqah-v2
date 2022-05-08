import { Router } from "restify-router";

import { pingAndGetOKResponse } from "../controllers/PingController";

var PingRouter = new Router();

PingRouter.get("/ping", pingAndGetOKResponse);

export default PingRouter;
