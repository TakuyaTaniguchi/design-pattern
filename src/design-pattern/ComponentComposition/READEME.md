# Component Compositionパターン

## 概要
Component Compositionパターンは、小さな特化したコンポーネントを組み合わせて、柔軟で再利用可能なUIを構築するアプローチです。「コンポジション over 継承」の原則に基づき、継承よりもコンポジションを優先します。

## パターンの本質
このパターンの核心は、**単一責任の原則**に基づいた小さなコンポーネントを組み合わせることで、複雑なUIを構築する点にあります。各コンポーネントは特定の役割だけを持ち、それらを組み合わせることで柔軟性と再利用性を高めます。

### Before（コンポジションなし）：
```jsx
// 一枚岩の巨大なコンポーネント
const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{product.name}</h3>
      </div>
      <div className="card-body">
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p className="price">¥{product.price}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary">カートに追加</button>
      </div>
    </div>
  );
};
```

### After（コンポジションあり）：
```jsx
// コンポジションを使った再利用可能なコンポーネント
const ProductDisplay = ({ product }) => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{product.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Image src={product.image} alt={product.name} />
        <Card.Text>{product.description}</Card.Text>
        <Card.Text className="price">¥{product.price}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary">カートに追加</Button>
      </Card.Footer>
    </Card>
  );
};
```

### 別解

```tsx
const Tabs = ({ children }) => {
  return <div className="border p-4">{children}</div>;
};

const TabList = ({ children }) => {
  return <div className="flex space-x-2">{children}</div>;
};

const Tab = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`p-2 border-b-2 ${isActive ? "border-blue-500" : "border-transparent"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const TabPanels = ({ children, activeIndex }) => {
  return <div className="p-4">{children[activeIndex]}</div>;
};

// 使用例
const App = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Tabs>
      <TabList>
        <Tab label="タブ1" onClick={() => setActiveIndex(0)} isActive={activeIndex === 0} />
        <Tab label="タブ2" onClick={() => setActiveIndex(1)} isActive={activeIndex === 1} />
      </TabList>
      <TabPanels activeIndex={activeIndex}>
        <div>タブ1のコンテンツ</div>
        <div>タブ2のコンテンツ</div>
      </TabPanels>
    </Tabs>
  );
};

export default App;

```

## メリット
- **コードの再利用性**: 同じコンポーネントを様々な文脈で再利用できる
- **保守性の向上**: 各コンポーネントが単一の責任を持つため、変更の影響範囲が限定される
- **柔軟性**: 異なる組み合わせで様々なUIバリエーションを作成できる
- **理解しやすさ**: 関心の分離により、コードの意図が明確になる

## デメリット
- **過度の分割**: 小さすぎるコンポーネントへの分割はかえって複雑さを増す場合も
- **Prop Drilling**: ネストが深い場合、プロップの受け渡しが煩雑になる
- **設計の難しさ**: 適切な粒度でのコンポーネント分割には経験が必要

## ビジネスでの活用シーン
- **共通UIライブラリの構築**: 社内デザインシステムの実装
- **複雑なフォーム**: 入力フィールド、バリデーション、送信ボタンなどの組み合わせ
- **ダッシュボード**: 様々なカード、グラフ、情報パネルの組み合わせ
- **ナビゲーション**: メニュー、サブメニュー、ドロップダウンなどの組み合わせ
- **レイアウトシステム**: ヘッダー、サイドバー、コンテンツエリア、フッターの組み合わせ

## 実装のポイント
1. **サブコンポーネントの命名規則**: `Parent.Child`形式で関連性を明示する
2. **childrenの活用**: Reactのchildrenプロップでコンテンツをネストできるようにする
3. **スタイリングの一貫性**: 一貫したスタイリングルールを適用する
4. **コンポーネント階層の適切な設計**: 深すぎず、浅すぎないネスト構造を目指す
5. **明確なインターフェース設計**: 各コンポーネントの受け取るプロップを明確にする

## 関連パターン
- **Compound Components**: コンポジションの一種で、暗黙的な状態共有を持つ
- **Render Props**: 柔軟性を高めるためにコンポジションと組み合わせて使われる
- **HOC（Higher Order Components）**: コンポーネント機能を拡張する別のアプローチ
  */