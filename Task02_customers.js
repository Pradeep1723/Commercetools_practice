const {
  createCustomer,
  getCustomerById,
  getCustomerByKey,
  createCustomerToken,
  confirmCustomerEmail,
  assignCustomerToCustomerGroup,
  getCustomers, 
  updateCustomerEmail,
  deleteCustomerByID, 
  deleteCustomerByKey,
  createField
} = require("./handson/customer");

const { log } = require("./logger.js");

// getCustomers().then(log).catch(log)

const customerDraftData = {
  firstName: "Roshan",
  lastName: "H S",
  email: "roshan.hs@gmail.com",
  password: "secretKey@rhs",
  key: "testKey",
  countryCode: "US",
};

const customerEmailUpdateData = {
  // email: "pradeep.bhat@gmail.com"
};

// createCustomer(customerDraftData).then(log).catch(log);

// updateCustomerEmail(customerEmailUpdateData, "2bc2d960-d657-4497-b5ea-2be007cbcdd8").then(log).catch(log);

// getCustomerByKey('test1234').then(log).catch(log);

// deleteCustomerByID("b2cce23a-c5d2-4dd3-a87d-72c229512b32").then(log).catch(log)

// deleteCustomerByKey("test1234").then(log).catch(log)

// getCustomerById("2bc2d960-d657-4497-b5ea-2be007cbcdd8").then(log).catch(log);

// getCustomerByKey('test123')
//   .then(createCustomerToken)
//   .then(confirmCustomerEmail)
//   .then(log)
//   .catch(log);

// assignCustomerToCustomerGroup('test','practice').then(log).catch(log);

// createField('c0727bb5-c1f8-42d3-a3d4-798cd96607bc').then(log).catch(log)

// createCustomerToken("{{customer-id}}").then(log).catch(log)

// confirmCustomerEmail("{{token-Value}}").then(log).catch(log)