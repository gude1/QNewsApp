export type SignupAttributes = {
  name: string;
  email: string;
  password: string;
};

export type LoginAttributes = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  name: string;
};
