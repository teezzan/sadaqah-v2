export type GenericObject<m = any> = {
  [key: string]: m;
};

export type APIUser = {
  name: string;
  email: string;
  avatar: string;
  id: string;
};
