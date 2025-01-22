const errorHandler = async (err, req, res, next) => {
  let {status = 500, message = "Something went wrong"} = err;
  res.status(status).send({message});
};
export {errorHandler};
