// ComponentComposition/components/Layout.jsx
import React from 'react';


// レイアウトコンポーネント
export const Layout = ({ children }) => {
    return <div className="layout">{children}</div>;
};

Layout.Header = ({ children }) => {
    return <header className="layout-header">{children}</header>;
};

Layout.Sidebar = ({ children }) => {
    return <aside className="layout-sidebar">{children}</aside>;
};

Layout.Content = ({ children }) => {
    return <main className="layout-content">{children}</main>;
};

Layout.Footer = ({ children }) => {
    return <footer className="layout-footer">{children}</footer>;
};
