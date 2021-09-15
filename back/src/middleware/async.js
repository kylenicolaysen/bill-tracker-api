/*
Function that puts every route 
into a try/catch and sends error 
to error handler middleware
*/
module.exports = function (handler) { 
  return async (req, res, next) => {
    try {
      await handler(req, res)
    }
    catch (e) {
      next(e)
    }
  }
}