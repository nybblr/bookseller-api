const { Router } = require('express');
const bodyParser = require('body-parser');
const stripe = require('./stripe');
const checkStripeSignature = require('./check-stripe-signature');
const sendDownloadEmail = require('./send-download-email');
const {
  STRIPE_SIGNING_KEY,
  BOOK_PATH,
} = process.env;

const assertEventType = require('./assert-stripe-event-type');

const routes = Router();

routes.use(bodyParser.raw({type: 'application/json'}));
routes.use(checkStripeSignature(STRIPE_SIGNING_KEY));

routes.post('/purchased', assertEventType('checkout.session.completed'), async (req, res) => {
  let details = req.event.data.object;
  let {
    payment_intent: paymentIntentId,
    display_items,
  } = details;

  let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  let {
    payment_method: paymentMethodId,
  } = paymentIntent;

  let paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
  let {
    billing_details: { email, name }
  } = paymentMethod;

  let items = display_items.map(item => item.sku);

  console.log(email, name);
  console.log(items);

  let customer = { email, name };

  let item = items[0];
  let title = item.attributes.name;
  let image = item.image;

  let book = { title, image, path: BOOK_PATH };

  await sendDownloadEmail({ customer, book });

  res.json({ received: true });
});

module.exports = routes;