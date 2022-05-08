import { Router } from "restify-router";

import {
  authorizedPingAndGetOKResponse,
  unAuthorizedPingAndGetOKResponse,
} from "../controllers/PingController";
import { authentication } from "../middleware/Auth";

var PingRouter = new Router();

PingRouter.get("/ping", authentication, authorizedPingAndGetOKResponse);
PingRouter.get("/freeping", unAuthorizedPingAndGetOKResponse);

export default PingRouter;
