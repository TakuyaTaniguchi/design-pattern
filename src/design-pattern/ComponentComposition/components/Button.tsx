// ComponentComposition/components/Button.jsx
import React from 'react';

// 汎用ボタンコンポーネント
export const Button = ({
                           children,
                           variant = 'primary',
                           size = 'medium',
                           disabled = false,
                           onClick,
                           className,
                           ...props
                       }) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className || ''}`}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
