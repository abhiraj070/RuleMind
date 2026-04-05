import  mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role: {
        enum: ['admin', 'compliance_officer', 'auditor'],
        type: String,
    },
    refreshToken:{
        type: String
    }
},{timestamps: true})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect= async function(password){
    const result= await bcrypt.compare(password,this.password)
    return result
}

userSchema.methods.generateAccessToken = async function () {
    return JWT.sign({
        _id: this._id,
        fullName: this.fullName,
        email: this.email,
        role: this.role 
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = async function () {
    return JWT.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}
export const User= mongoose.model('User', userSchema)