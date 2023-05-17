const states = require("./handson/states");
const { log } = require("./logger.js");

const orderPackedStateDraft = {
  key: "ff-order-packed",
  type: "OrderState",
  name: {
    "de": "FF Order Packed ",
    "en": "FF Order Packed ",
  },
  initial: true,
};

const orderPendingStateDraft = {
  key: "ff-order-pending",
  type: "OrderState",
  name: {
    "en": "FF Order Pending "
  },
  initial: false
} 

const orderCompletedStateDraft = {
  key: "ff-order-completed",
  type: "OrderState",
  name: {
    "de": "FF Order Completed ",
    "en": "FF Order Completed ",
  },
  initial: false,
};

// states.createNewState(orderPackedStateDraft).then(log).catch(log)

// const createStatesWithTransitions = async () => {
//   let orderPackedState = await states.createNewState(orderPackedStateDraft)
//   let orderCompletedState = await states.createNewState(orderCompletedStateDraft)

//   orderPackedState = states.addTransition(orderPackedState.body.id, [orderCompletedState.body.id])

//   orderCompletedState = states.addTransition(orderCompletedState.body.id, [])

//   return orderPackedState;
// };

// createStatesWithTransitions().then(log).catch(log)

// states.getStateByKey(orderPackedStateDraft.key).then(log).catch(log)

// states.getStateById("{{state-id}}").then(log).catch(log)