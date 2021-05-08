export const ADD_USER = 'ADD_USER';

export function addUser(value) {
  return {
    type: ADD_USER,
    payload: value
  };
}

//export const addItem = payload => {
//  return {
//    type: "LISTITEM_ADD",
//    payload
//  };
//};
