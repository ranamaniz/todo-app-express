
const asyncHandler = (reqFn) => async (req, res, next) => {
  try {
    await reqFn(req, res, next);
  } catch (err) {
    res.status(err?.code || 500).json({
      success: false,
      message: err?.message || "Sorry something went wrong",
      error: err,
    });
  }
};

// const asyncReqHandler=(reqFn)=>(req, res, next)=>{
//     Promise.resolve(reqFn(req, res, next)).catch(err)=>next(err))}

export { asyncHandler };
