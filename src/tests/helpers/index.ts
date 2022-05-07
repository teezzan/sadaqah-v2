import config = require("../../config");
import { ApiServer } from "../../server";

const server = new ApiServer();
const app=server.start(config.HTTP.port);

export default app