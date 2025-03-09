// src/design-pattern/render-props-pattern/MouseTracker.tsx

import React, { useState, useEffect } from 'react';

// マウス位置を追跡するためのデータ型
type MousePosition = {
    x: number;
    y: number;
};

// MouseTrackerコンポーネントのProps型
type MouseTrackerProps = {
    // render propは関数で、MousePosition型のデータを受け取りReactNodeを返す
    render: (mousePosition: MousePosition) => React.ReactNode;
};

/**
 * マウス位置を追跡し、render propを通じて位置データを子コンポーネントに提供するコンポーネント
 */
const MouseTracker: React.FC<MouseTrackerProps> = ({ render }) => {
    // マウス位置の状態
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

    // マウス移動イベントハンドラ
    const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    // コンポーネントマウント時にイベントリスナーを登録
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        // クリーンアップ関数
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []); // 空の依存配列で初回レンダリング時のみ実行

    // render propを呼び出して現在のマウス位置を渡す
    return (
        <div style={{ height: '100%' }}>
            {render(mousePosition)}
        </div>
    );
};

export default MouseTracker;

// 使用例:
// <MouseTracker
//   render={({ x, y }) => (
//     <div>
//       <h1>マウス位置:</h1>
//       <p>X: {x}, Y: {y}</p>
//     </div>
//   )}
// />d