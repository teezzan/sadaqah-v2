import winston = require("winston");

export class DefaultService {
  logger: winston.Logger;
  constructor(logger: winston.Logger) {
    this.logger = logger;
  }
}
