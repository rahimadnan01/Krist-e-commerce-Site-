const errorHandler = async (err, req, res, next) => {
  let {status = 500, message = "Something went wrong"} = err;
  res.status(status).render("../views/pages/error.ejs", {message});
};
export {errorHandler};
