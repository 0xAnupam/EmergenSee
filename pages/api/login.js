// Login to an account:  POST /api/login  {email, password}

import { connectMongoDB } from "@/src/db/mongoose";
import User from "@/src/models/user";
import Driver from "@/src/models/driver";
import cookie from 'cookie';

export default async function handler(req, res){
    if(req.method === "POST"){
        const {email, password, loginType} = req.body;
        try{
            await connectMongoDB();
            if(loginType==="user"){
                const foundUser = await User.findOne({email});
                if(!foundUser){
                    return res.status(400).send({error: "User doesn't exist"});
                }

                const authenticatedUser = await User.checkLoginCredentials(email, password);
                const token = await authenticatedUser.generateAuthTokens();

                const cookies = cookie.serialize('ambulanceAI', token, {
                    httpOnly: true,
                    maxAge: 24*60*60, // Token expires in 1 day
                    path: '/',
                });
                res.setHeader('Set-Cookie', cookies);
                res.status(200).send(authenticatedUser);
            }
            else if(loginType==="driver"){
                const foundDriver = await Driver.findOne({email});
                if(!foundDriver){
                    return res.status(400).send({error: "Driver doesn't exist"});
                }

                const authenticatedDriver = await Driver.checkLoginCredentials(email, password);
                const token = await authenticatedDriver.generateAuthTokens();

                const cookies = cookie.serialize('ambulanceAI', token, {
                    httpOnly: true,
                    maxAge: 24*60*60, // Token expires in 1 day
                    path: '/',
                });
                res.setHeader('Set-Cookie', cookies);
                res.status(200).send(authenticatedDriver);
            }
            else{   // admin
                if(email==="halderarindam10000@gmail.com"){
                    const foundUser = await User.findOne({email});
                    if(!foundUser){
                        return res.status(400).send({error: "Admin doesn't exist"});
                    }

                    const authenticatedUser = await User.checkLoginCredentials(email, password);
                    const token = await authenticatedUser.generateAuthTokens();

                    const cookies = cookie.serialize('ambulanceAI', token, {
                        httpOnly: true,
                        maxAge: 24*60*60, // Token expires in 1 day
                        path: '/',
                    });
                    res.setHeader('Set-Cookie', cookies);
                    res.status(200).send(authenticatedUser);
                }
            }
        }
        catch(err){
            // console.log(err);
            res.status(400).send({msg: err});
        }
    }
}