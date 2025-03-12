# Compound Componentsパターン

## 概要
Compound Componentsパターンは、複数の関連コンポーネントを組み合わせて一つの機能単位として使用するデザインパターンです。親コンポーネントが状態を管理し、子コンポーネントに暗黙的に状態を共有します。

## パターンの本質
このパターンの核心は、**関連するコンポーネント群を一つの名前空間にまとめ、コンテキストを通じて暗黙的に状態を共有する**点にあります。これにより、使用側はコンポーネントの内部実装を知らなくても、直感的に使用できます。

### Before（Compound Componentsなし）：
```jsx
// 従来の冗長なアプローチ
const Tabs = ({ items }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tab-list">
        {items.map((item, index) => (
          <button
            key={index}
            className={index === activeTab ? 'active' : ''}
            onClick={() => setActiveTab(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {items[activeTab].content}
      </div>
    </div>
  );
};

// 使用例
<Tabs
  items={[
    { label: '顧客情報', content: <CustomerInfo /> },
    { label: '注文履歴', content: <OrderHistory /> },
    { label: '分析', content: <Analytics /> }
  ]}
/>
```

### After（Compound Components）：
```jsx
// Compound Componentsを使った宣言的なアプローチ
<Tabs defaultActiveTab={0}>
  <TabList>
    <Tab index={0}>顧客情報</Tab>
    <Tab index={1}>注文履歴</Tab>
    <Tab index={2}>分析</Tab>
  </TabList>
  <TabPanels>
    <TabPanel index={0}><CustomerInfo /></TabPanel>
    <TabPanel index={1}><OrderHistory /></TabPanel>
    <TabPanel index={2}><Analytics /></TabPanel>
  </TabPanels>
</Tabs>
```

## メリット
- **API表面積の削減**: 使用者は内部実装を知る必要がなく、宣言的に使用できる
- **柔軟なレイアウトカスタマイズ**: 子コンポーネントの順序や配置を自由に変更できる
- **関連コンポーネントの論理的なグループ化**: 機能的に関連するコンポーネントを一つの名前空間にまとめられる
- **使用側の自由度向上**: タブの間にコンテンツを追加するなど、柔軟なカスタマイズが可能

## デメリット
- **内部実装の理解が必要**: 初めて使用する場合、どのコンポーネントが利用可能か理解する必要がある
- **過度の使用は複雑さを増す**: 多くのネストされたCompound Componentsは混乱を招く可能性がある
- **テストが若干複雑になる可能性**: コンポーネント間の暗黙的な結合のため

## ビジネスでの活用シーン
- **複雑なフォームコンポーネント**: Form, FormField, FormLabel, FormInputなど
- **タブインターフェース**: サンプルのように顧客情報/注文履歴/分析などの切り替え
- **ドロップダウンメニュー**: Dropdown, DropdownToggle, DropdownMenuなど
- **アコーディオン**: Accordion, AccordionItem, AccordionHeaderなど
- **データテーブル**: Table, TableHeader, TableBody, TableRowなど

## 実装のポイント
1. Contextを使用して子コンポーネント間で状態を共有する
2. 子コンポーネントをメインコンポーネントのプロパティとして公開する
3. 明確なコンポーネント名と一貫した命名規則を使用する
4. 適切なデフォルト値を提供し、使いやすさを確保する
5. アクセシビリティを考慮した実装を心がける

## 関連パターン
- **Render Props**: より明示的な柔軟性が必要な場合に使用
- **Context API**: Compound Componentsの実装に使用される基本的な仕組み
- **Component Composition**: より一般的なコンポーネント構成パターン
  */