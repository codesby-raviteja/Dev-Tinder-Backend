const userAuthMiddleware = (req, res, next) => {
  const token = "abdc"
  const isAuthorised = token === "abc"
  if (!isAuthorised) {
    res.status(401).send("UnAuthorized Access")
  } else {
    next()
  }
}
const adminAuthMiddleware = (req, res, next) => {
  const token = "abc"
  const isAuthorised = token === "abc"
  if (!isAuthorised) {
    res.status(401).send("UnAuthorized Access")
  } else {
    next()
  }
}

module.exports = { adminAuthMiddleware, userAuthMiddleware }
