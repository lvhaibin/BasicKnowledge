const initialState = {    
    count: 0
}
function reducer(state = initialState, action) {    
    switch(action.type) {   
        case 'plus':        
        return {            
            ...state,                    
            count: state.count + 1        
        }      
        case 'subtract':        
        return {            
            ...state,            
            count: state.count - 1        
        }      
        default:        
        return initialState    
    }
}


// 实现
const createStore = (reducer) => {
    let currentState = {};
    let observers = [];

    const getState = () => {
        return currentState;
    }

    const dispatch = (action) => {
        currentState = reducer(currentState, action);
        observers.forEach(fn => fn());
    }

    const subscribe = (fn) => {
        observers.push(fn)
    }

    dispatch({ type: '@@REDUX_INIT' })  //初始化store数据        

    return {
        getState,
        dispatch,
        subscribe
    }
}



const store = createStore(reducer)
store.subscribe(() => { console.log('组件1收到store的通知') })
store.subscribe(() => { console.log('组件2收到store的通知') })
store.dispatch({ type: 'plus' })
