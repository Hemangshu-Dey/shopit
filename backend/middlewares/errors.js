import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };

    //Handle invalid n=mongoose ID error
    if(err.name === 'CastError'){
        const message = `Resource not fund.Invalid: ${err?.path}`
        error = new ErrorHandler(message,404)
    }

    //Handle VAlidation Error 
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message,400)
    }

    //Handle MOngoose Duplicate Key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered.`
        error = new ErrorHandler(message,400)
    }
    //Handle wrong JWT error
    if(err.name === 'JsonWebTokenError'){
        const message = `JSON Web Token is invalid.Try Again!!!`
        error = new ErrorHandler(message,404)
    }
    //Handle expired JWT error
    if(err.name === 'TokenExpiredError'){
        const message = `JSON Web Token is expired.Try Again!!!`
        error = new ErrorHandler(message,404)
    }

    //Handle Invalid Mongoose ID Error
    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(error.statusCode).json({
            message: error.message,
            error: err,
            stak: err?.stack,
        });
    }
    if (process.env.NODE_ENV === 'PRODUCTION') {
        res.status(error.statusCode).json({
            message: error.message,
        });
    }
};