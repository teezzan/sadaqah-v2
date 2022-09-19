import { Next } from "restify";
import { String, Record } from "runtypes";
import { RequestWithContext } from "../../types/restify";
import * as errors from "restify-errors";

export const CreateGroupPayload = Record({
  name: String,
});

export const BodyValidatonMiddleware = (schemaName: schemaName) => {
  return (req: RequestWithContext, res: Response, next: Next) => {
    try {
      const validator = schemaNameValidatorMap[schemaName];
      validator.check(req.body);
      next();
    } catch (err) {
      next(new errors.BadRequestError(err));
    }
  };
};

export const enum schemaName {
  CREATE_GROUP = "create_group",
}

export const schemaNameValidatorMap = {
  [schemaName.CREATE_GROUP]: CreateGroupPayload,
};
