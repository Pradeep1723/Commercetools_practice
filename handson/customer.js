const { apiRoot, projectKey } = require("./client.js");
const { log } = require("../logger.js")

module.exports.getCustomerById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .withId({ ID })
    .get()
    .execute()
}

module.exports.getCustomers = () => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .get({
      queryArgs: {
        // limit : 2, 
        // offset : 1
        // where : "lastName = \"\""
        // sort : "firstName DESC"
      }
    })
    .execute()
}

module.exports.getCustomerByKey = (key) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .withKey({ key: key })
    .get()
    .execute()
}

const createCustomerDraft = (customerData) => {

  const {
    firstName,
    lastName,
    email,
    password,
    key,
    countryCode
  } = customerData

  return {
    firstName,
    lastName,
    email,
    password,
    key,
    addresses: [
      {
        "country": countryCode
      }
    ]
  }
}

module.exports.createCustomer = (customerData) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .customers()
    .post({
      body: createCustomerDraft(customerData)
    })
    .execute()
}

const createCustomerEmailUpdate = (customerData, customer) => {
  // const { email } = customerData
  return {
    version: customer.body.version,
    actions: [
      {
        action: "changeEmail",
        email: customerData.email
      }
    ]
  }
}

module.exports.updateCustomerEmail = (customerData, ID) => {

  return this.getCustomerById(ID).then((customer) => {

    return apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID })
      .post({
        body: createCustomerEmailUpdate(customerData, customer)
      })
      .execute()
  }).catch(log)
}

module.exports.deleteCustomerByID = (ID) => {
  return this.getCustomerById(ID).then((customer) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID })
      .delete({
        queryArgs: {
          version: customer.body.version
        }
      })
      .execute()
  }).catch(log)
}

module.exports.deleteCustomerByKey = (Key) => {
  return this.getCustomerByKey(Key).then((customer) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withKey({ key: Key })
      .delete({
        queryArgs: {
          version: customer.body.version
        }
      })
      .execute()
  }).catch(log)
}

module.exports.createCustomerToken = (ID) => 
this.getCustomerById(ID).then(customer => {  
  return apiRoot
  .withProjectKey({projectKey})
  .customers()

  .emailToken()
  .post({
    body: {
      id: customer.body.id,
      version: customer.body.version,
      ttlMinutes: 90
    }
  })
  .execute()
}).catch(log)

module.exports.confirmCustomerEmail = (value) => 
  apiRoot
    .withProjectKey({projectKey})
    .customers()
    .emailConfirm()
    .post({
      body: {
        tokenValue: value
      }
    })
    .execute()

module.exports.assignCustomerToCustomerGroup = (
  customerKey,
  customerGroupKey
) =>
  this.getCustomerByKey(customerKey).then((customer) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withKey({ key: customerKey })
      .post({
        body: {
          version: customer.body.version,
          actions: [{
            action: "setCustomerGroup",
            customerGroup: {
              key: customerGroupKey,
              typeId: "customer-group"
            }
          }]
        }
      })
      .execute()
  }).catch(log)


// <--- Custom type ---> The createType function need to be done only once.
// module.exports.createType = () => {
//   return apiRoot
//   .withProjectKey({projectKey})
//   .types()
//   .post({  
//     body: 
//     {
//     "key": "customer_custom_field2",
//     "name": {
//         "en": "Custom field Customer",
//         "es": "Campo personalizado Cliente"
//     },
//     "description": {
//         "en": "Creating custom field",
//         "es": "Creando campo personalizado"
//     },
//     "resourceTypeIds": [ "customer" ],
//     "fieldDefinitions": [{
//         "type": {
//             "name": "LocalizedString"
//         },
//         "name": "gender",
//         "label": {
//             "en": "set gender",
//             "es": "establecer género"
//         },
//         "required": false,
//         "inputHint": "SingleLine"
//     }]
//   }
// })
// .execute()
// }

module.exports.createCustomerType = (ID) =>
  this.getCustomerById(ID).then((customer) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID })
      .post({
        body: {
          version: customer.body.version,
          actions: [
            {
              action: "setCustomType",
              type: {
                key: "customer_custom_field2",
                typeId: "type"
              },
              fields: {
                exampleStringTypeField: "TextString",
              }
            }
          ]
        }
      })
  })

module.exports.createField = (ID) =>
  this.getCustomerById(ID).then((customer) => {
    return apiRoot
      .withProjectKey({ projectKey })
      .customers()
      .withId({ ID })
      .post({
        body:
        {
          version: customer.body.version,
          actions: [
            {
              action: "setCustomField",
              name: "gender",
              value: {
                en: "Male",
                es: "Masculino"
              }
            }
          ]
        }
      })
      .execute()
  }).catch(log)