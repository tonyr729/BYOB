const checkAuth = (request, response, next) => {
  if (process.env.NODE_ENV === 'test') {
    next();
  } else {
    if (request.body.token) {
      try {
        const decoded = jwt.verify(request.body.token, process.env.SECRET_KEY);
        next()
      } catch (error) {
        response.status(401).json({ error: "Token not recognized!" })
      }
    } else {
      response.status(403).json({ error: "You must provide an authorized token!" })
    }
  }
}

module.exports = checkAuth