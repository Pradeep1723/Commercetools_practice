const {
        getStoreByKey, 
        getCustomersInStore, 
        createInStoreCart, 
        createStoreType, 
        getStoreById,
        createStoreField
} = require("./handson/store");

const { getCustomerByKey } = require("./handson/customer");
const { log } = require("./logger");

// getStoreByKey('uk').then(log).catch(log);

getCustomersInStore('uk').then(customers => {
    log(customers.body.count);
    customers.body.results.forEach(customer =>
        log(customer.id)
    )}).catch(log);

// getCustomerByKey("test123").then((customer) => {
//    createInStoreCart("berlin-store",customer).then(log).catch(log);
// }).catch(log);

// getStoreById("553cee71-ebd9-4329-9939-c87ef2b8b734").then(log).catch(log)

// createStoreField("b6a6fec0-207d-48af-9a68-03a7742c5d91").then(log).catch(log)