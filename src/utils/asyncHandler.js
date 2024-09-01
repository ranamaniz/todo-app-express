import { ApiError } from "./apiError";

const asyncHandler = (reqFn) => async (req, res, next) => {
  try {
    await reqFn(req, res, next);
  } catch (err) {
    const error = new ApiError(err.code || 500, err.message);

    res.json(error);
  }
};

// const asyncReqHandler=(reqFn)=>(req, res, next)=>{
//     Promise.resolve(reqFn(req, res, next)).catch(err)=>next(err))}

export { asyncHandler };
