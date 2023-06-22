import UserServices from "../services/userServices.js";
import bcrypt from "bcryptjs";
import logger from "../utils/logger.js";
import { Request, Response, NextFunction } from "express";
import {
  ReadUserOutput,
  TokenOutput,
  User,
} from "../interface/UserInterfaces.js";

class UserControllers {
  private userServices: UserServices;

  constructor() {
    this.userServices = new UserServices();
  }

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, name, agreePi, company } = req.body;
      const pass = await bcrypt.hash(password, 10);
      await this.userServices.validation(email, password);
      const result = await this.userServices.createUser(
        email,
        pass,
        name,
        agreePi,
        company,
      );
      return res.status(200).send({ result });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };
  authMail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name } = req.body;
      //정규식으로 email 형식 체크 yup으로 대체 필요성 못느낌
      const regExp =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!regExp.test(email)) {
        return res.status(400).send({ error: "이메일 형식이 아닙니다." });
      }
      await this.userServices.authMail(email, name);
      return res.status(200).send({
        msg: `${email}로 인증번호가 발송되었습니다. 3분후 발송된 인증번호는 폐기됩니다.`,
      });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  authCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, code } = req.body;
      await this.userServices.authCode(email, code);
      return res.status(200).send({ msg: "인증되었습니다." });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      await this.userServices.checkUser(email, password);
      const token: TokenOutput = await this.userServices.createToken(email);
      return res.status(200).send({ token });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  signout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userEmail = res.locals.userEmail;
      await this.userServices.signout(userEmail);
      return res.status(200).send({ msg: "로그아웃 되었습니다." });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, ...rest } = req.body;
      const user: string = await this.userServices.updateUser(email, rest);
      return res.status(200).send({ user });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  patchEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, newemail } = req.body;
      const user: string = await this.userServices.patchEmail(email, newemail);
      return res.status(200).send({ user });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user: string = await this.userServices.deleteUser(email, password);
      return res.status(200).send({ user });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user: string = await this.userServices.resetPassword(
        email,
        password,
      );
      return res.status(200).send({ user });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  readUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id as string;
      const user: ReadUserOutput = await this.userServices.readUser(id);
      return res.status(200).send({ user });
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send({ error: error.message });
    }
  };

  checkUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!password) {
        const checkMail: string = await this.userServices.checkMail(email);
        return res.status(200).send({ checkMail });
      } else {
        const user: string = await this.userServices.checkPassword(
          email,
          password,
        );
        return res.status(200).send({ user });
      }
    } catch (error: any) {
      logger.error(error.stack || error.message);
      return res.status(400).send(error.message);
    }
  };
}

export default UserControllers;
