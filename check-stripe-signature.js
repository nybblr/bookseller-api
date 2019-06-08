const stripe = require('./stripe');

let checkStripeSignature = (signature) => (req, res, next) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      signature
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  req.event = event;
  next();
};

module.exports = checkStripeSignature;