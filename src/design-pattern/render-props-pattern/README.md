# Render Propsパターン

## 概要
Render Propsパターンは、コンポーネントのレンダリングロジックを分離し、親コンポーネントが子コンポーネントの表示方法を制御できるようにする設計手法です。コンポーネントがJSX要素ではなく、関数をpropsとして受け取り、その関数を呼び出してレンダリング結果を決定します。

## パターンの本質
このパターンの核心は、**ロジックと表示の明確な分離**にあります。データ取得やユーザーインタラクションなどのロジックをカプセル化しつつ、そのデータをどのように表示するかの決定権を使用側に委ねることで、高い柔軟性と再利用性を実現します。

### Before（Render Propsなし）：
```jsx
// ロジックと表示が密結合した従来のアプローチ
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.example.com/products');
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;
  
  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>¥{product.price}</p>
          <button>カートに追加</button>
        </div>
      ))}
    </div>
  );
};
```

### After（Render Props）：
```jsx
// ロジックと表示を分離したRender Propsアプローチ
<DataFetcher
  url="https://api.example.com/products"
  renderLoading={() => <CustomLoadingSpinner />}
  renderError={(error) => <ErrorDisplay message={error} onRetry={handleRetry} />}
  renderSuccess={(data) => (
    <ProductGrid 
      products={data} 
      onAddToCart={handleAddToCart} 
    />
  )}
/>
```

## メリット
- **ロジックの再利用性が高い**: UIとロジックを明確に分離できる
- **表示とロジックの明確な分離**: どのようにデータを取得・処理するかと、どのように表示するかを分けられる
- **柔軟なカスタマイズ性**: 同じロジックに対して異なる表示を簡単に実装できる
- **条件付きレンダリングの明確化**: loading/error/successなどの状態ごとの表示を明示的に定義できる

## デメリット
- **コールバック地獄になる可能性**: ネストが深くなると読みにくくなる
- **パフォーマンス最適化が必要な場合がある**: 不要な再レンダリングを防ぐために`React.memo`などが必要になることも
- **コードの可読性に影響する場合がある**: 特に複雑なロジックの場合、追跡が難しくなる可能性がある

## ビジネスでの活用シーン
- **データ取得ロジックの共有**: APIからのデータ取得とローディング/エラー状態の処理
- **複雑なインタラクションの抽象化**: ドラッグ&ドロップ、マウストラッキングなど
- **フィルタリング/ソート機能の実装**: データテーブルでの並べ替えやフィルタリングロジック
- **ページネーション**: ページ切り替えロジックとUI表示の分離
- **認証フロー**: ログイン状態に応じた表示の切り替え

## 実装のポイント
1. props経由でrender関数を受け取る（`render`プロパティまたは`children`として）
2. コンポーネント内部で状態や処理を行い、結果をrender関数に渡す
3. 複数のrender propsが必要な場合は名前を明確にする（renderLoading/renderErrorなど）
4. TypeScriptを使用する場合は関数の型定義を明確にする

## 関連パターン
- **Custom Hooks**: Render Propsよりも簡潔に再利用可能なロジックを実装できる場合が多い
- **HOC（Higher Order Components）**: 同様の目的を持つが、コンポーネントをラップする形で実装する
- **Context API**: グローバルな状態共有が必要な場合に組み合わせて使用される
  */

