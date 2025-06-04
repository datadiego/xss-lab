export const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).render('error.njk')
  }
  next()
}
