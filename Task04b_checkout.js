const checkout = require("./handson/order");
const { log } = require("./logger.js");

const customerKey = "test";
const cartId = "807c2596-9ae8-4003-a824-97fe836c6336"; // "5df5b159-8c1c-4b69-9879-f0250fa0698f"; 
const orderId = "c4c4688e-be82-4cd5-9865-9b3c12e15e1c";

const paymentDraft = {
  key:"payment" + Math.random().toString(36).substr(2, 5),
  amountPlanned:{
    currencyCode: 'EUR',
    centAmount: 5000
  }
}

// create a cart and update the catId variable
// checkout.createCart(customerKey).then(log).catch(log)

// checkout.addLineItemsToCart(cartId,['A0E2000000027DV','A0E2000000024BC']).then(log).catch(log)

// checkout.addDiscountCodeToCart(cartId, "SUMMER").then(log).catch(log)
// checkout.getCartById(cartId).then(log).catch(log)

// create order from cart and update the orderId
// checkout.createOrderFromCart(cartId).then(log).catch(log)

// checkout.addShippingAddress(cartId).then(log).catch(log)

// checkout.createPayment(paymentDraft).then(log).catch(log)

// checkout.addPaymentToCart(cartId, "eae83630-0d9a-4dd1-be2a-e8c6ab34b281").then(log).catch(log)

// checkout.getPaymentById("eae83630-0d9a-4dd1-be2a-e8c6ab34b281").then(log).catch(log)

// checkout.updatePaymentStateById("eae83630-0d9a-4dd1-be2a-e8c6ab34b281").then(log).catch(log)

// checkout.getOrderById(orderId).then(log).catch(log)

// set order state to confirmed and custom workflow state to order packed
// checkout.setOrderState(orderId, 'Confirmed').then(log).catch(log)
// checkout.updateOrderCustomState(orderId,"ff-order-packed").then(log).catch(log)

// checkout.setPaymentState(orderId, "Paid").then(log).catch(log)

// checkout.setShipmentState(orderId,  "Shipped").then(log).catch(log)

const checkoutProcess = async () => {
  let emptyCart = await checkout.createCart(customerKey);

  let filledCart = await checkout.addLineItemsToCart(
    emptyCart.body.id,['A0E2000000027DV']
  );
  // filledCart = await checkout.addDiscountCodeToCart(
  //   emptyCart.body.id, 'SUMMER'
  // );

  let order = await checkout.createOrderFromCart(filledCart.body.id);
  const payment = await checkout.createPayment(paymentDraft); // Add payment to cart should be done after this function.
  order = await checkout.addPaymentToOrder(order.body.id, payment.body.id);
  order = await checkout.setOrderState(order.body.id, 'Confirmed');
  order = await checkout.updateOrderCustomState(order.body.id,'ff-order-packed');
  if (order) {
    return {
      status: 201,
      message: "order created: " + order.body.id,
    };
  }
};

// checkoutProcess().then(log).catch(log);

// checkout.getOrders().then(log).catch(log)

// checkout.getCartById("807c2596-9ae8-4003-a824-97fe836c6336").then(log).catch(log)