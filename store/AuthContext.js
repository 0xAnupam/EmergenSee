import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
    userId: "",
    userType: "",
    userData: "",
    isAuthenticated: "",
    updateUserId: (id)=>{},
    updateUserType: (userType)=>{},
    updateUserData: (userData)=>{},
    updateAuthenticationStatus: (status)=>{},
});

export const AuthContextProvider = (props)=>{
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const updateUserId = (id)=>{
        setUserId(id);
    }
    const updateUserType = (userType)=>{
        setUserType(userType);
    }
    const updateUserData = (userData)=>{
        setUserData(userData);
    }
    const updateAuthenticationStatus = (status)=>{
        setIsAuthenticated(status);
    }

    useEffect(()=>{
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth');
                const data = response.data;

                if (data.user) {
                    setUserData(data.user);
                    setUserId(data.user._id);
                    setIsAuthenticated(true);
                    setUserType(data.user.userType);
                }
            } catch (error) {
                console.error('Error:', error);
                setUserData(null);
                setUserId(null);
                setUserType(null);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, [])

    
    const authContext = {
        userId: userId,
        userType: userType,
        userData, userData,
        isAuthenticated: isAuthenticated,
        updateUserId: updateUserId,
        updateUserType: updateUserType,
        updateUserData: updateUserData,
        updateAuthenticationStatus: updateAuthenticationStatus,
    }

    return <AuthContext.Provider value={authContext}>{props.children}</AuthContext.Provider>
}

export default AuthContext;