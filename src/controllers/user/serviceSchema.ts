import { GenericObject } from "./data/structures";

export interface Service {
  ping(auth: boolean): GenericObject<string>;
}

