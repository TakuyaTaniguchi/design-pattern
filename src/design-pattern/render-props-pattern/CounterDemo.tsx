// src/design-pattern/render-props-pattern/CounterDemo.tsx

import React from 'react';
import Counter from './Counter';

/**
 * Counterコンポーネントの使用例
 * children as function版のRender Propsパターンを利用
 */
const CounterDemo: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Counter with Render Props (children as function)</h1>

            <div style={{ display: 'flex', gap: '20px' }}>
                {/* シンプルなカウンターUI */}
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                    <h2>シンプルなカウンター</h2>
                    <Counter initialValue={5}>
                        {({ count, increment, decrement, reset }) => (
                            <div>
                                <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                                    カウント: {count}
                                </p>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={increment}>増加</button>
                                    <button onClick={decrement}>減少</button>
                                    <button onClick={reset}>リセット</button>
                                </div>
                            </div>
                        )}
                    </Counter>
                </div>

                {/* 同じCounter状態を別のUIで表示 */}
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
                    <h2>別のスタイルのカウンター</h2>
                    <Counter initialValue={10}>
                        {({ count, increment, decrement, reset }) => (
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        backgroundColor: `rgba(0, 128, 255, ${count / 20})`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '32px',
                                        fontWeight: 'bold',
                                        color: 'white',
                                        margin: '0 auto 15px'
                                    }}
                                >
                                    {count}
                                </div>
                                <div>
                                    <button onClick={() => { increment(); increment(); }}>+2</button>
                                    <button onClick={reset}>リセット</button>
                                    <button onClick={() => { decrement(); decrement(); }}>-2</button>
                                </div>
                            </div>
                        )}
                    </Counter>
                </div>
            </div>
        </div>
    );
};

export default CounterDemo;