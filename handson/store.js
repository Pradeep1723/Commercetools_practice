const { log } = require("../logger.js");
const { apiRoot, storeApiRoot, projectKey } = require("./client.js");
const { getCustomerById, getCustomers } = require("./customer.js")

//TODO store and productProjection endpoint

module.exports.getStoreByKey = (key) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .stores()
    .withKey({ key })
    .get()
    .execute()
}

module.exports.getStoreById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .stores()
    .withId({ ID })
    .get()
    .execute()
}

module.exports.getCustomersInStore = (storeKey) => {
  return this.getCustomers().then((response) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .customersInStore()
      .withKey({ key: storeKey })
      .get()
      .execute()
  }).catch(log)
}

module.exports.addProductSelectionToStore = async (storeKey, productSelectionKey) => { }

module.exports.getProductsInStore = (storeKey) => { }

module.exports.createInStoreCart = (storeKey, customer) => { }

// + + + Custom Type and Field + + +
module.exports.createStoreType = (ID) => {
  return this.getStoreById(ID).then((store) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .stores()
      .withId({ ID })
      .post({
        body: {
          version: store.body.version,
          actions: [
            {
              action: "setCustomType",
              type: {
                key: "set_store_custom_field",
                typeId: "type"
              },
              fields: {
                exampleStringTypeField: "TextString"
              }
            }
          ]
        }
      })
  }).catch(log)
}

module.exports.createStoreField = (ID) => {
  return this.getStoreById(ID).then((store) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .stores()
      .withId({ ID })
      .post({
        body: {
          version: store.body.version,
          actions: [{
            action: "setCustomField",
            name: "store_timings_tuesday",
            value: {
              "en": "10am to 6pm"
            }
          },
          {
            action: "setCustomField",
            name: "store_timings_wednesday",
            value: {
              "en": "10am to 6pm"
            }
          },
          {
            action: "setCustomField",
            name: "store_timings_thursday",
            value: {
              "en": "10am to 6pm"
            }
          },
          {
            action: "setCustomField",
            name: "store_timings_friday",
            value: {
              "en": "10am to 5pm"
            }
          },
          {
            action: "setCustomField",
            name: "store_timings_saturday",
            value: {
              "en": "10am to 1pm. Every alternate Saturday is holiday."
            }
          },
          {
            action: "setCustomField",
            name: "store_timings_sunday",
            value: {
              "en": "Shop is closed on Sundays."
            }
          }]
        }
      })
      .execute()
  }).catch(log)
}