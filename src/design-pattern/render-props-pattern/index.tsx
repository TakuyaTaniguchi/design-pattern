import React, { useState, useEffect } from 'react';

// DataFetcherコンポーネント - データ取得ロジックをカプセル化
export const DataFetcher = ({
                                url,
                                renderLoading,
                                renderError,
                                renderSuccess,
                                fetchOptions = {}
                            }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, fetchOptions);

                if (!response.ok) {
                    throw new Error(`APIエラー: ${response.status}`);
                }

                const result = await response.json();

                if (isMounted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, JSON.stringify(fetchOptions)]);

    if (loading) {
        return renderLoading ? renderLoading() : <div>読み込み中...</div>;
    }

    if (error) {
        return renderError ? renderError(error) : <div>エラー: {error}</div>;
    }

    return renderSuccess(data);
};


// 使用例
export const ProductList = () => {
    return (
        <DataFetcher
            url="https://api.example.com/products"
            renderLoading={() => (
                <div className="loader">
                    <div className="spinner"></div>
                    <p>商品データを読み込み中...</p>
                </div>
            )}
            renderError={(error) => (
                <div className="error-container">
                    <h3>データの取得に失敗しました</h3>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>再試行</button>
                </div>
            )}
            renderSuccess={(data) => (
                <div className="products-grid">
                    {data.map(product => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            <p>¥{product.price.toLocaleString()}</p>
                            <button>カートに追加</button>
                        </div>
                    ))}
                </div>
            )}
        />
    );
};