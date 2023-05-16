const { apiRoot, projectKey } = require("./client.js");
const { getCustomerByKey } = require("./customer.js");
const { log } = require("../logger.js")

module.exports.createCart = async (customerKey) => {
  return getCustomerByKey(customerKey)
    .then(customer => apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .post({
        body: {
          currency: "EUR",
          country: "DE",
          customerId: customer.body.id,
          customerEmail: customer.body.email,
          shippingAddress: customer.body.addresses.find(address => address.id === customer.body.defaultShippingAddressId)
        }
      })
      .execute()
    ).catch(log)
}

module.exports.createAnonymousCart = () =>
  apiRoot.withProjectKey({ projectKey })
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: "DE",
      }
    })
    .execute()

module.exports.customerSignIn = (customerDetails) => { }

module.exports.addLineItemsToCart = (cartId, arrayOfSKUs) => {
  return this.getCartById(cartId).then((cart) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions:
            arrayOfSKUs.map(sku => {
              return {
                action: "addLineItem",
                sku
              }
            })
        }
      })
      .execute()
  }).catch(log)
}

module.exports.getCartById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .carts()
    .withId({ ID })
    .get()
    .execute()
}

module.exports.addShippingAddress = (ID) =>
  this.getCartById(ID).then(cart => {
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID })
      .post({
        body: {
          version: cart.body.version,
          actions: [{
            action: "setShippingAddress",
            address: {
              key: "example_testKey",
              title: "Mr.",
              firstName: "Roshan",
              lastName: "H S",
              streetName: "1st Cross, Millers Road",
              streetNumber: "12",
              additionalStreetInfo: "Backhouse",
              postalCode: "560083",
              city: "Exemplary City",
              region: "Exemplary Region",
              state: "",
              country: "US",
              company: "My Company",
              department: "IT",
              building: "Hightower 1",
              apartment: "247",
              pOBox: "2471",
              phone: "+49 89 12345678",
              mobile: "+49 171 2345678",
              email: "email@example.com",
              fax: "+49 89 12345679",
              additionalAddressInfo: "no additional Info",
              externalId: "Information not needed"
            }
          }]
        }
      })
      .execute()
  }).catch(log)

module.exports.addDiscountCodeToCart = (cartId, discountCode) =>
  this.getCartById(cartId).then(cart => {
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: [{
            action: "addDiscountCode",
            code: discountCode
          }]
        }
      })
      .execute()
  }).catch(log)

module.exports.createOrderFromCart = async (cartId) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .orders()
    .post({
      body: await createOrderFromCartDraft(cartId)
    })
    .execute()
}

const createOrderFromCartDraft = async (cartId) =>
  this.getCartById(cartId).then(cart => {
    return {
      cart: {
        id: cartId,
        typeId: "cart"
      },
      version: cart.body.version,
    };
  });

module.exports.getOrderById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .orders()
    .withId({ ID })
    .get()
    .execute()
}

module.exports.updateOrderCustomState = async (orderId, customStateKey) =>
  this.getOrderById(orderId).then(order => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [{
            action: "transitionState",
            state: {
              key: customStateKey,
              typeId: "state"
            }
          }]
        }
      })
      .execute()
  }).catch(log)

const createPaymentDraft = (paymentDraft) => {
  const {
    key,
    customer,
    anonymousId,
    interfaceId,
    amountPlanned,
    paymentMethodInfo,
    paymentStatus,
    transactions
  } = paymentDraft

  return {
    key: "123456",
    interfaceId: "789011",
    amountPlanned: {
      currencyCode: "USD",
      centAmount: 1000
    },
    paymentMethodInfo: {
      paymentInterface: "STRIPE",
      method: "CREDIT_CARD",
      name: {
        en: "Credit Card"
      }
    },
    transactions: [{
      timestamp: "2023-04-20T16:25:24.000Z",
      type: "Charge",
      amount: {
        currencyCode: "USD",
        centAmount: 1000
      },
      state: "Success"
    }]
  }
}

module.exports.createPayment = (paymentDraft) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .payments()
    .post({
      body: createPaymentDraft(paymentDraft)
    })
    .execute()
}

module.exports.addPaymentToCart = (cartId, paymentId) =>
  this.getCartById(cartId).then(cart => {
    return apiRoot
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: cart.body.version,
          actions: [{
            action: "addPayment",
            payment: {
              id: paymentId,
              typeId: "payment"
            }
          }]
        }
      })
      .execute()
  }).catch(log)

module.exports.getPaymentById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .payments()
    .withId({ ID })
    .get()
    .execute()
}

module.exports.updatePaymentStateById = (paymentId) =>
  this.getPaymentById(paymentId).then(payment => {
    return apiRoot
      .withProjectKey({ projectKey })
      .payments()
      .withId({ ID: paymentId })
      .post({
        body: {
          version: payment.body.version,
          actions: [{
            action: "changeTransactionState",
            transactionId: payment.body.transactions[0].id, // "6d1258c8-d304-4b78-9d59-bd3654985637", // 
            state: "Success"
          }]
        }
      })
      .execute()
  }).catch(log)

module.exports.setOrderState = (orderId, stateName) =>
  this.getOrderById(orderId).then(order => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [{
            action: "changeOrderState",
            orderState: stateName
          }]
        }
      })
      .execute()
  }).catch(log)

module.exports.addPaymentToOrder = (orderId, paymentId) =>
  this.getOrderById(orderId).then(order => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [{
            action: "addPayment",
            payment: {
              typeId: "payment",
              id: paymentId
            }
          }]
        }
      })
      .execute()
  }).catch(log)

// module.exports.reCalculate = (cartId) =>
//   this.getCartById(cartId).then(cart => {
//     return apiRoot
//       .withProjectKey({ projectKey })
//       .carts()
//       .withId({ ID: cartId })
//       .post({
//         body: {
//           version: cart.body.version,
//           actions: [{
//             action: "recalculate",
//             updateProductData: true
//           }]
//         }
//       })
//       .execute()
//   }).catch(log)

module.exports.setPaymentState = (orderId, stateName) =>
  this.getOrderById(orderId).then(order => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [{
            action: "changePaymentState",
            paymentState: stateName
          }]
        }
      })
      .execute()
  }).catch(log)

module.exports.setShipmentState = (orderId, stateName) =>
  this.getOrderById(orderId).then(order => {
    return apiRoot
      .withProjectKey({ projectKey })
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          version: order.body.version,
          actions: [{
            action: "changeShipmentState",
            shipmentState: stateName
          }]
        }
      })
      .execute()
  }).catch(log)

module.exports.getOrders = () =>
  apiRoot
    .withProjectKey({ projectKey })
    .orders()
    .get({
      queryArgs: {
        where: "paymentInfo is defined",
        expand: "paymentInfo.payments[*].id"
      }
    })
    .execute()