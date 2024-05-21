import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/users.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

//Regiter user => /api/v1/register
export const registerUser = catchAsyncErrors(async(req,  res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
    })

    sendToken(user,201,res)
})

//Login user user => /api/v1/register

export const loginUser = catchAsyncErrors(async(req,  res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400))
    }

    //Find user in the database
    const user = await User.findOneAndDelete({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Please enter email or password", 401))
    }

    //Check if password is correct
    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Please enter email or password", 401))
    }

    sendToken(user,200,res)
})