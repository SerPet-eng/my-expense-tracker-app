export const initialState = {
  isAuthenticated: false,
  users: null,
  expenses: [],
  isClicked: false
};

export const ACTIONS = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  UPDATE_EXPENSE: 'UPDATE_EXPENSE',
  CLEAR_EXPENSE: 'CLEAR_EXPENSE',
  FETCH_USER_EXPENSES: 'FETCH_USER_EXPENSES', // Kept only this for fetching user-specific expenses
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
};

export const reducers = (state, actions) => {
  switch (actions.type) {
    case ACTIONS.LOGIN:
      return { ...state, isAuthenticated: true, users: actions.payload };
    case ACTIONS.LOGOUT:
      return { ...state, isAuthenticated: false, users: null };
    case ACTIONS.FETCH_USER_EXPENSES:
      return { ...state, expenses: actions.payload };
    case ACTIONS.ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, actions.payload] };
    case ACTIONS.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== actions.payload, // 🔥 Fixed ID reference
        ),
      };
    case ACTIONS.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === actions.payload.id
            ? { ...expense, ...actions.payload }
            : expense,
        ),
      };
    case ACTIONS.CLEAR_EXPENSE:
      return { ...state, expenses: [] };
    case ACTIONS.TOGGLE_SIDEBAR:
      return {...state, isClicked: !state.isClicked}
    default:
      return state;
  }
};
