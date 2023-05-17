const { simulatePagination,
    getProductById,
    changeProductName,
    productProjections,
    getProductProjectionsById,
    productProjectionsQuery } = require("./handson/search");
const { log } = require("./logger");

let perPage = 2, lastPage = false, lastId = null, where = null;

const getPagedQueryResults = async _ => {
    while (!lastPage) {
        const { results: products, count } = (await simulatePagination(perPage, where)).body

        const elementArray = []

        log("- - - - - - This is New Page - - - - - -")

        products.forEach(element => {
            elementArray.push(element.id)
        });

        lastPage = count < perPage

        if (!lastPage) {
            lastId = products[products.length - 1].id
            where = `id > "${lastId}"`
        }
        log(elementArray)
    }
}

getPagedQueryResults().catch(log);



// ---------------------------------------------- *************************** ----------------------------------------- //
const productId = "20c3affe-4c50-414a-82a3-be7f970d8f25"

// getProductById(productId).then(log).catch(log)

// changeProductName(productId).then(log).catch(log)

// productProjections().then(log).catch(log)

// getProductProjectionsById(productId).then(log).catch(log)

// productProjectionsQuery().then(log).catch(log)