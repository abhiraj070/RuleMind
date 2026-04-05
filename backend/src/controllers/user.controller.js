import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asynchandler } from "../utils/asynchandler.js"

const login= asynchandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        throw new ApiError(400, "Email and password are required")
    }
    const user = await User.findOne({ email})
    if(!usingser){
        throw new ApiError(404, "User not found")
    }
    const isPasswordCorrect= await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        return ApiError(401, "Invalid password")
    }
    const accessToken= user.generateAccessToken()
    const refreshToken= user.generateRefreshToken()
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
    .json(new ApiResponse(200,{user: user, accessToken, refreshToken},"User is successfully logged in"))
})

export {login}