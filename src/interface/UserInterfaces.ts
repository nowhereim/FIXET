import { User } from "../models/models.js";

export interface SignupInput {
  email: string;
  password: string;
  name: string;
  agreePi: boolean;
  company: string;
}

export type UserResult = User | null;

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
  rest: {
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
