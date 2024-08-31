import { NextFunction, Request, Response } from "express";
import { RouteHandler } from "../types";

const asyncHandler =
  (reqFn: RouteHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await reqFn(req, res, next);
    } catch (err) {
      return res.status(err?.code || 500).json({
        success: false,
        message: err?.message || "Sorry something went wrong",
        error: err,
      });
    }
  };

// const asyncReqHandler=(reqFn)=>(req, res, next)=>{
//     Promise.resolve(reqFn(req, res, next)).catch(err)=>next(err))}

export { asyncHandler };
