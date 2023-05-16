const { apiRoot, projectKey } = require("./client.js");

module.exports.getProjectDetails = () => {
  return apiRoot
    .withProjectKey({ projectKey })
    .get()
    .execute()
}

module.exports.getShippingMethodByID = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .shippingMethods()
    .withId({ ID })
    .get()
    .execute()
}

module.exports.getTaxCategoryByKey = (key) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .taxCategories()
    .withKey({ key })
    .get()
    .execute()
}

module.exports.getTaxCategoryById = (ID) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .taxCategories()
    .withId({ ID })
    .get()
    .execute()
}