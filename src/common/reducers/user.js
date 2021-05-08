import { ADD_USER } from '../actions/user';

const initialState = [{
  text: 'The user is not registered',
  completed: false,
  id: 0
}];

export default function user(state = initialState, action) {
  switch (action.type) {
  case ADD_USER:
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: action.text
    }, ...state];

  //case DELETE_TODO:
  //  return state.filter(todo =>
  //    todo.id !== action.id
  //  );

  //case EDIT_TODO:
  //  return state.map(todo =>
  //    todo.id === action.id ?
  //      Object.assign({}, todo, { text: action.text }) :
  //      todo
  //  );

  default:
    return state;
  }
}