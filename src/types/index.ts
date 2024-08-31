import { NextFunction, Request, Response } from "express";

type RouteHandlerParams = { req: Request; res: Response; next: NextFunction };

type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export { RouteHandlerParams, RouteHandler };
