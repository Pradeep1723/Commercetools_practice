const { apiRoot, projectKey } = require("./handson/client.js");
const { log } = require("./logger");


// const query = `
// query {
//     orders {
//       results {
//         customer {
//           email
//         }
//         lineItems {
//           nameAllLocales {
//             value
//           }
//         }
//         totalPrice {
//           centAmount
//         }
//       }
//     }
//   }
//   `;

const query = `
query getProductById {
  product(id: "20c3affe-4c50-414a-82a3-be7f970d8f25") {
  id
    masterData {
      current {
        masterVariant {
          id
          sku
        }
        name(locale: "en")
      }
    }
  }
}
`;

// TODO: POST GraphQL query
apiRoot
.withProjectKey({projectKey})
.graphql()
.post({
  body: {
    query,
    // operationName,
    variables: {}
  }
})
.execute()
.then(log)
.catch(log)