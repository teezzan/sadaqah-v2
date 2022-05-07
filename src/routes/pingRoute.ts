import { Server } from "restify"
import config = require("../config")
import pingAndGetOKResponse from "../controllers/PingController"


const PingRoute = (server: Server) => {
    server.get({ path: config.basePath('/ping'),
        version: '1.0.0' }, pingAndGetOKResponse.pingAndGetOKResponse)
}

export default PingRoute
