const { apiRoot, projectKey } = require("./client.js");
const { log } = require("../logger.js")

module.exports.getAllProducts = () => {
    return apiRoot
        .withProjectKey({ projectKey })
        .products()
        .get()
        .execute()
}

// filter query recalculates everything
// filter facet recalculates others only
module.exports.simulateSearch = () => { }

module.exports.simulatePagination = async (perPage, where) => {
    return apiRoot
        .withProjectKey({ projectKey })
        .products()
        .get({
            queryArgs: {
                limit: perPage,
                where,
                sort: "id asc"
            }
        })
        .execute()
}



// Extra functions ---> Changing product data:
module.exports.getProductById = (productId) =>
    apiRoot
        .withProjectKey({ projectKey })
        .products()
        .withId({ ID: productId })
        .get()
        .execute()

module.exports.changeProductName = (productId) =>
    this.getProductById(productId).then(product => {
        return apiRoot
            .withProjectKey({ projectKey })
            .products()
            .withId({ ID: productId })
            .post({
                body:
                {
                    version: product.body.version,
                    actions: [{
                        action: "changeName",
                        name: {
                            "de": "Neuer produkt-name",
                            "en": "New product-name"
                        }
                    }]
                }
            })
            .execute()
    }).catch(log)

module.exports.productProjections = () =>
    apiRoot
        .withProjectKey({ projectKey })
        .productProjections()
        .get()
        .execute()

module.exports.getProductProjectionsById = (productId) =>
    this.getProductById(productId).then(product => {
        return apiRoot
            .withProjectKey({ projectKey })
            .productProjections()
            .withId({ ID: productId })
            .get()
            .execute()
    }).catch(log)

module.exports.productProjectionsQuery = async (limit, count) => {
    return apiRoot
        .withProjectKey({ projectKey })
        .productProjections()
        .get({
            queryArgs: {
                limit,
                count,
            }
        })
        .execute()
}