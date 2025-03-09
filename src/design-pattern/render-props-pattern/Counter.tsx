// src/design-pattern/render-props-pattern/Counter.tsx

import React, { useState } from 'react';

// カウンターの状態とそれを操作する関数を含む型
type CounterState = {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
};

// Counterコンポーネントのprops型
// children as functionパターンを使用
type CounterProps = {
    initialValue?: number;
    children: (state: CounterState) => React.ReactNode;
};

/**
 * カウンター状態とその操作を提供するRender Propsコンポーネント
 * children as functionパターンを使用
 */
const Counter: React.FC<CounterProps> = ({ initialValue = 0, children }) => {
    const [count, setCount] = useState(initialValue);

    // カウンター操作関数
    const increment = () => setCount(prev => prev + 1);
    const decrement = () => setCount(prev => prev - 1);
    const reset = () => setCount(initialValue);

    // カウンター状態と操作関数をまとめたオブジェクト
    const counterState: CounterState = {
        count,
        increment,
        decrement,
        reset
    };

    // childrenとして渡された関数に状態を渡して実行
    return <>{children(counterState)}</>;
};

export default Counter;

// 使用例:
// <Counter>
//   {({ count, increment, decrement, reset }) => (
//     <div>
//       <p>カウント: {count}</p>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//       <button onClick={reset}>リセット</button>
//     </div>
//   )}
// </Counter>