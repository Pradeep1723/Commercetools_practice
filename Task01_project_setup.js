const { getProjectDetails, getShippingMethodByID, getTaxCategoryByKey, getTaxCategoryById } = require("./handson/project.js");
const { log } = require("./logger.js");

// TODO 1: Complete the functions in
// ./handson/client.js

// TODO : GET project details
// getProjectDetails().then(log).catch(log)

// (async function getDetail() {
//     let projectLog = await getProjectDetails()
//     log(projectLog)
// })()


// So this code displays the project configuration
// https://docs.commercetools.com/http-api-projects-project.html#get-project

// TODO : GET ShippingMethod by ID
// getShippingMethodByID("4fba08fe-1d67-40b6-9d98-f1bf01d710ad").then(log).catch(log)

// TODO : GET Tax Category by key
// getTaxCategoryByKey("low").then(log).catch(log)

// getTaxCategoryById("f5514a85-d3e0-4f68-927f-94f0b5ce689c").then(log).catch(log)