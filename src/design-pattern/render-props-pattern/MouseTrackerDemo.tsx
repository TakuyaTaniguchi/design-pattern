// src/design-pattern/render-props-pattern/MouseTrackerDemo.tsx

import React from 'react';
import MouseTracker from './MouseTracker';

// マウスに追従するカーソルコンポーネント
const MouseFollower: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <div
        style={{
            position: 'fixed',
            top: y,
            left: x,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'red',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
        }}
    />
);

// マウス座標を表示するコンポーネント
const MouseCoordinates: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <div
        style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            fontFamily: 'monospace'
        }}
    >
        X: {x}, Y: {y}
    </div>
);

// Render Propsパターンのデモコンポーネント
const MouseTrackerDemo: React.FC = () => {
    return (
        <div style={{ height: '100vh', padding: '20px' }}>
            <h1>Render Propsパターンのデモ</h1>
            <p>画面上でマウスを動かしてみてください</p>

            {/* MouseTrackerコンポーネントを使用 */}
            <MouseTracker
                render={({ x, y }) => (
                    <>
                        {/* 同じマウス位置データを複数のコンポーネントで再利用 */}
                        <MouseFollower x={x} y={y} />
                        <MouseCoordinates x={x} y={y} />
                    </>
                )}
            />
        </div>
    );
};

export default MouseTrackerDemo;