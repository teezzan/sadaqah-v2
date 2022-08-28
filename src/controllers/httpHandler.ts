import winston = require("winston");

export class DefaultHTTPHandler {
  logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
  }
}
