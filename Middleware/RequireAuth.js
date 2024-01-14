const jwt = require("jsonwebtoken")

const RequireAuth = async (req, res, next) => {
  const { authorization } = req.headers
  
  if (!authorization)
    return res.status(401).json({ requiredAuth: "authorization required" })
  
  const token = authorization.split(" ")[1]
  try {
    const uncryptedtoken = jwt.verify(token, process.env.SECRET)
    req.user = { ...uncryptedtoken }    
    next()
  } catch (err) {
    res.status(401).json("Request is not authorized")
  }
}
module.exports = RequireAuth