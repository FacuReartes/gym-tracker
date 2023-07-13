import jwt from "jsonwebtoken"

const accesTokenSecret = "youraccestokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere"

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!token) {
    res.status(401).json({ message:  "There is no token" })
  } else {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accesTokenSecret, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Token failed to verify" })
      } 

      res.locals.user = decoded;
      next();
    })
  }
}

export {
  authenticateJWT,
  accesTokenSecret,
  refreshTokenSecret
}