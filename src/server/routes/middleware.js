export const init = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

export const send = (req, res, next) => res.json(res.locals);