import models from "../models/index.js";
import User from "../models/user.js";
import sequelize from "../models/index.js";

export { User, sequelize };
export interface SignupInput {
  email: string;
  password: string;
  name: string;
  agreePi: boolean;
  company: string;
}

export type UserResult = typeof models.User | null;

export interface ReadUserOutput {
  userId?: number | undefined;
  email: string;
  name?: string | undefined;
  agreePi: boolean;
  identifier?: number | undefined;
  phone?: string | undefined;
  job?: string | undefined;
  company?: string | undefined;
}

export interface TokenOutput {
  accessToken: string;
  user: {
    userId?: number | undefined;
    email: string;
    name?: string | undefined;
    agreePi: boolean;
    identifier?: number | undefined;
    phone?: string | undefined;
    job?: string | undefined;
    company?: string | undefined;
  };
}
