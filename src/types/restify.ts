import { Request } from "restify";

export interface RequestWithContext extends Request {
  query: any;
  body: any;
  get(key: string): any;
  set(key: string, value: any): void;
}
