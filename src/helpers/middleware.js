import getDataFromToken from './getDataFromToken';
import User from '../models/user';
import Driver from '../models/driver';

// Middleware to verify JWT token from cookie
export const withAuth = (handler) => async (req, res) => {
  try {
    const token = req.cookies.ambulanceAI;

    if (!token) {
      return res.json({ message: 'Unauthorized: No Token found' });
    }

    const personData = getDataFromToken(token);
    const personId = personData._id;
    const personType = personData.userType;
    
    if(personType==="user"){
      const authUser = await User.findOne({_id: personId, "tokens.token": token});  // retrieve user data from token
      // console.log(authUser);

      if (!authUser) {
        return res.json({ message: 'Unauthorized' });
      }
      req.user = authUser;
      req.userType = "user";
    }
    else{
      const authDriver = await Driver.findOne({_id: personId, "tokens.token": token});  // retrieve user data from token
      // console.log(authUser);

      if (!authDriver) {
        return res.json({ message: 'Unauthorized' });
      }
      req.user = authDriver;
      req.userType = "driver";
    }

    return handler(req, res);
  } catch (error) {
    console.error('Error:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};