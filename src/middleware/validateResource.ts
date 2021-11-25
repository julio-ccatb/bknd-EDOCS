import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

/**
 * 
 * 
 * 
@description
Used to validate custom schemas
 */
export const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (er: any) {
      res.status(200).send(er.errors);
    }
  };
