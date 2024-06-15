import React, { useEffect, useState, useMemo } from 'react';

function UseMemoHook() {
    const [add, setAdd] = useState(0);
    const [minus, setMinus] = useState(100);

    // Using useMemo to memoize the result of multiplyFun
    const multiply = useMemo(() => {
        console.log("********");
        return add * 10;
    }, [add]); // Depend on 'add' state change

    return (
        <div>
            {multiply}
            <button onClick={() => { setAdd(add + 1); }}>Add</button>
            {add}
            <button onClick={() => { setMinus(minus - 1); }}>Subtract</button>
            {minus}
        </div>
    );
}

export default UseMemoHook;
