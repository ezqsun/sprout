const jwt = require('jsonwebtoken')
const JWTKey = "50eb7727-6290-4be6-a119-3505051e0d3e"

function verifyToken(req, res, next) {
    const token = req.headers['authorization'] || req.headers['x-access=token']
    console.log(token)

    //Remove 'Bearer' from string
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token){
        jwt.verify(token, JWTKey, (err, decoded) => {
        if (err) {
            res.send("Invalid token")
        } else {
            console.log(decoded)
            res.send(decoded)
            next()
        }
    })}else{
        return res.send('Missing authorization token')
    }
}

module.exports = {
    verifyToken: verifyToken
}
