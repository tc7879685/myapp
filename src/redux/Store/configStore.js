import  thunkMiddleware from 'redux-thunk'
import  {createStore,applyMiddleware,compose} from 'redux'
import  RootReducer from '../Reducer/rootReducer'


export  default  function  configStore(initstatte) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //redux调试
    const  store = createStore(RootReducer,initstatte,
        composeEnhancers(applyMiddleware(thunkMiddleware))
        )
    return store
}
