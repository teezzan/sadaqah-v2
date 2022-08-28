import { Router } from "restify-router";

import {
  authorizedPingAndGetOKResponse,
  unAuthorizedPingAndGetOKResponse,
} from "./service";
import { authentication } from "./authMiddleware";

var PingRouter = new Router();

PingRouter.get("/ping", authentication, authorizedPingAndGetOKResponse);
PingRouter.get("/freeping", unAuthorizedPingAndGetOKResponse);

export default PingRouter;
