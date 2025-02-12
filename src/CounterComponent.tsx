// ExampleComponent.js
import React from 'react';

// 数字を２倍にする関数
export function doubleNumber(number: number) {
  return number * 2;
}

// ボタンをクリックするとカウントを増やすコンポーネント
export function CounterComponent() {
  const [count, setCount] = React.useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={incrementCount}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}
