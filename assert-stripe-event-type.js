let assertEventType = (type) => (req, res, next) => {
  if (req.event.type === type) {
    next();
  } else {
    res.sendStatus(400);
  }
};

module.exports = assertEventType;