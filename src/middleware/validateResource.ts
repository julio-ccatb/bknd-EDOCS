import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import logger from "../utils/logger";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, nex: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
    } catch (er: any) {
      logger.error(er);
      res.status(200).send(er.errors);
    }
  };
