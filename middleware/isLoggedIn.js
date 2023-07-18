// Check if the user is loggedIn before acces to profile
import { getTokenFromHeader } from "../utils/generateToken.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIn = (req, res, next) => {
    // check token is in header 
    const token = getTokenFromHeader(req)
    // verify the token
    const decodedUser = verifyToken(token)
    // cbeck if decoded is valid if yes save the user in req.object
    if(!decodedUser){
        throw new Error('invalid/expired token, please logged in')
    }else{
        req.userAuthId = decodedUser?.id
        next()
    }

}