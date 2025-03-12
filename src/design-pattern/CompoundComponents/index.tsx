// CompoundComponents/index.jsx
import React, { createContext, useContext, useState } from 'react';


// 型を定義
type TabsContextType = {
    activeTab: number;
    setActiveTab: (tabIndex: number) => void;
};

// 型を適用
const TabsContext = createContext<TabsContextType>({
    activeTab: 0,
    setActiveTab: () => {} // 空の関数でエラー回避
});


// Tabsコンポーネント本体
export const Tabs = ({ children, defaultActiveTab = 0 }: { children: ReactNode; defaultActiveTab?: number }) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs-container">{children}</div>
        </TabsContext.Provider>
    );
};

// TabListコンポーネント - タブボタンのコンテナ
export const TabList = ({ children }) => {
    return <div className="tab-list">{children}</div>;
};

// Tabコンポーネント - 個々のタブボタン
export const Tab = ({ index, children }) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === index;

    return (
        <button
            className={`tab ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
            role="tab"
            aria-selected={isActive}
        >
            {children}
        </button>
    );
};

// TabPanelsコンポーネント - タブコンテンツのコンテナ
export const TabPanels = ({ children }) => {
    return <div className="tab-panels">{children}</div>;
};

// TabPanelコンポーネント - 個々のタブコンテンツ
export const TabPanel = ({ index, children }) => {
    const { activeTab } = useContext(TabsContext);
    const isActive = activeTab === index;

    if (!isActive) return null;

    return (
        <div className="tab-panel" role="tabpanel">
            {children}
        </div>
    );
};

// 使用例
export const TabsExample = () => {
    return (
        <Tabs defaultActiveTab={0}>
            <TabList>
                <Tab index={0}>顧客情報</Tab>
                <Tab index={1}>注文履歴</Tab>
                <Tab index={2}>分析</Tab>
            </TabList>

            <TabPanels>
                <TabPanel index={0}>
                    <h3>顧客情報</h3>
                    <p>顧客の基本情報がここに表示されます。</p>
                </TabPanel>
                <TabPanel index={1}>
                    <h3>注文履歴</h3>
                    <p>過去の注文履歴がここに表示されます。</p>
                </TabPanel>
                <TabPanel index={2}>
                    <h3>分析</h3>
                    <p>顧客の行動分析データがここに表示されます。</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};