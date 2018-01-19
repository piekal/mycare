'user strict';

/*
 * Check token
 */
exports.loginRequired = function(req, res, next){
  console.log('Check auth token');
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
}
