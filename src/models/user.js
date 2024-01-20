import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ],
        requests: [
            {
                name: String,
                phone: String,
                location: String
            }
        ]
    }
);

// Generate Auth tokens after every login of a user
const JWT_SECRET = process.env.JWT_SECRET;
userSchema.methods.generateAuthTokens = async function(){
    const authenticatedUser = this;
    const token = jwt.sign({_id: authenticatedUser._id.toString(), userType: "user"}, JWT_SECRET, {expiresIn: "1 day"} );
    
    authenticatedUser.tokens = authenticatedUser.tokens.concat({token});
    await authenticatedUser.save();

    return token;
}


userSchema.statics.checkLoginCredentials = async (email,pass)=> {
    const registeredUser = await User.findOne({email});
    if(!registeredUser){
        throw new Error("Authentication Failed: User not registered");
    }
    const isMatch = await bcryptjs.compare(pass, registeredUser.password);

    if(!isMatch){
        throw new Error("Authentication failed: Password mismatched");
    }

    return registeredUser;
}


// hashing password before saving user in db
userSchema.pre("save", async function(next){
    const user = this;

    if(user.isModified("password")){    // if user creates an account or change their password..only that time the pass should be hashed
        user.password = await bcryptjs.hash(user.password, 8);    // salting round = 8
    }

    next();
})


const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;