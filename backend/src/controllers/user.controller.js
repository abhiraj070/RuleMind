import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asynchandler.js"

const register= asyncHandler(async (req,res) => {
    // console.log(req.body);
    
    const {fullName, email, role, password}= req.body
    if(!fullName || !email || !role ||!password){
        throw new ApiError(401,"All credintials are required")
    }

    const isNewUser= await User.findOne({email})
    if(isNewUser){
        throw new ApiError(400,"User already exists")
    }

    const user= await User.create({
        fullName,
        email,
        role,
        password
    })

    const userRegistred= await User.findById(user._id).select("-refreshToken -password")

    return res
    .status(200)
    .json(new ApiResponse(200,{user: userRegistred},"User successfully registered"))
})


const login= asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        throw new ApiError(400, "Email and password are required")
    }
    const user = await User.findOne({ email})
    if(!user){
        throw new ApiError(404, "User not found")
    }
    const isPasswordCorrect= await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(401, "Incorrect password")
    }
    const accessToken= await user.generateAccessToken()
    const refreshToken= await user.generateRefreshToken()
    if(!accessToken||!refreshToken){
        throw new ApiError(500,"something went wrong while generating tokens")
    }
    const loggedInUser= await User.findOne({email}).select("-refreshToken -password")
    user.refreshToken= refreshToken
    await user.save({validationBeforSave: false})
    const isProduction= process.env.ISPRODUCTION
    const options={
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction? "none" : "lax",
        path:"/"
    }
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200,{user: loggedInUser, accessToken, refreshToken},"User is successfully logged in"))
})

export {login, register}