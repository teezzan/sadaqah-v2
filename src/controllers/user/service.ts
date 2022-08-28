interface Service {
  ping(auth: boolean): GenericObject<string>;
}

type GenericObject<m = any> = {
  [key: string]: m;
};
