import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    // the id is a reference to the user
    // after the id, is a key, wich is a signature of the token 
    // expire date
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn: '3d'})
}

export default generateToken

export const getTokenFromHeader = (req) => {
    const token = req?.headers?.authorization.split(' ')[1]
    if(token === 'undefined'){
        return 'no token found in the headers'

    }else{
        return token
    }
}
