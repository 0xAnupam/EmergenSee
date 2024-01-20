import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const driverSchema = new mongoose.Schema(
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
        hospitalName: {
            type: String,
            required: true
        },
        vehicleNo: {
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
        oxygenSupport:{
            type: Boolean,
            required: true
        },
        available: {
            type: Boolean,
            required: true
        }
    }
);

// Generate Auth tokens after every login of a user
const JWT_SECRET = process.env.JWT_SECRET;
driverSchema.methods.generateAuthTokens = async function(){
    const authenticatedDriver = this;
    const token = jwt.sign({_id: authenticatedDriver._id.toString(), userType: "driver"}, JWT_SECRET, {expiresIn: "1 day"} );
    
    authenticatedDriver.tokens = authenticatedDriver.tokens.concat({token});
    await authenticatedDriver.save();

    return token;
}


driverSchema.statics.checkLoginCredentials = async (email,pass)=> {
    const registeredDriver = await Driver.findOne({email});
    if(!registeredDriver){
        throw new Error("Authentication Failed: User not registered");
    }
    const isMatch = await bcryptjs.compare(pass, registeredDriver.password);

    if(!isMatch){
        throw new Error("Authentication failed: Password mismatched");
    }

    return registeredDriver;
}


// hashing password before saving user in db
driverSchema.pre("save", async function(next){
    const driver = this;

    if(driver.isModified("password")){    // if user creates an account or change their password..only that time the pass should be hashed
        driver.password = await bcryptjs.hash(driver.password, 8);    // salting round = 8
    }

    next();
})


const Driver = mongoose.models.Driver || mongoose.model("Driver", driverSchema);
export default Driver;