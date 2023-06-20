import logger from "../utils/logger.js";
import { verify } from "../utils/verify.js";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).send({ errorMessage: "Please login first." });
      return;
    }
    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer" || !tokenValue) {
      res.status(401).send({ errorMessage: "Please login first." });
      return;
    }
    // const decoded = jwt.decode(tokenValue);

    const veresult = verify(tokenValue);
    if (!veresult) {
      return res.status(401).send({
        errorMessage: "The access token has expired.",
      });
    }
    // res.locals.userEmail = decoded.email;
    next();
  } catch (error: any) {
    logger.error(error.stack || error.message);
    return res.status(401).send({ error });
  }
};
