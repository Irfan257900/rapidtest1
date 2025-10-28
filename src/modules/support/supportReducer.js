import supportReducer from './supportActions';

const rootReducer = combineReducers({
  support: supportReducer,
});

export default rootReducer;
content_combineReducers: {
  support: supportReducer,
}