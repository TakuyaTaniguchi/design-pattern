// ComponentComposition/components/Card.jsx
import React from 'react';

// 基本的なカードコンポーネント
export const Card = ({ children, className, ...props }) => {
    return (
        <div className={`card ${className || ''}`} {...props}>
            {children}
        </div>
    );
};

// サブコンポーネント
Card.Header = ({ children, className, ...props }) => {
    return (
        <div className={`card-header ${className || ''}`} {...props}>
            {children}
        </div>
    );
};

Card.Body = ({ children, className, ...props }) => {
    return (
        <div className={`card-body ${className || ''}`} {...props}>
            {children}
        </div>
    );
};

Card.Footer = ({ children, className, ...props }) => {
    return (
        <div className={`card-footer ${className || ''}`} {...props}>
            {children}
        </div>
    );
};

Card.Image = ({ src, alt, className, ...props }) => {
    return (
        <img
            src={src}
            alt={alt || ''}
            className={`card-image ${className || ''}`}
            {...props}
        />
    );
};

Card.Title = ({ children, className, ...props }) => {
    return (
        <h3 className={`card-title ${className || ''}`} {...props}>
            {children}
        </h3>
    );
};

Card.Text = ({ children, className, ...props }) => {
    return (
        <p className={`card-text ${className || ''}`} {...props}>
            {children}
        </p>
    );
};






