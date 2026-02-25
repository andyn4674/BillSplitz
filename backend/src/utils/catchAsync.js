module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

/**
 * Usage:
 * app.get('users', catchAsync(req,res) => {
 *  const users = await db.getUsers();
 *  res.json(users);
 * }) 
 * 
 * 
 * No need of try catch anymore
 */