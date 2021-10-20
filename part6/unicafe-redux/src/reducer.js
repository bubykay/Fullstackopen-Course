const initialState = {
    good: 0,
    ok: 0,
    bad: 0
};

const counterReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
    case 'DO-NOTHING':
        return state;
    case 'GOOD':
        const { good } = state;
        return { ...state, good:Number(good)+1 };
    case 'OK':
        const { ok } = state;
        return { ...state, ok:Number(ok)+1 };
    case 'BAD':
        const { bad } = state;
        return { ...state, bad:Number(bad)+1 };
    case 'ZERO':
        return { good:0,bad:0,ok:0 };
    default: return state;
    }

};

export default counterReducer;