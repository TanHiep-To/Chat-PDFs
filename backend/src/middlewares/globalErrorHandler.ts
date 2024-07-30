import "colors";
import { ErrorRequestHandler } from "express";
import HttpStatus from "http-status-codes";
import ApiError from "../common/ApiError";
import { NODE_ENV } from "../config/const";
import { IGenericErrorMessage } from "../common/error";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (NODE_ENV === "development") {
    console.log(
      "Error on Route --> ".red,
      req.path.yellow,
      `[${req.method}]`.green
    );
    console.log(error);
  }
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: IGenericErrorMessage[] = [];
  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  }

  const statusCodeText = HttpStatus.getStatusText(statusCode);
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errorMessages,
    responseStatus: statusCodeText.toUpperCase().split(" ").join("_"),
    stack: NODE_ENV === "development" ? error.stack : undefined,
  });
  // next();
};

export default globalErrorHandler;
