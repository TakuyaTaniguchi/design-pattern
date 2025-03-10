// src/design-pattern/proxy-pattern/ApiDemo.tsx

import React, { useState } from 'react';
import { ApiServiceProxy } from './ApiService';

// APIプロキシのインスタンスを作成
// 通常はアプリケーション全体で1つのインスタンスを共有する
const apiService = new ApiServiceProxy('https://api.example.com', 5000); // 5秒キャッシュ

const ApiDemo: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [postResult, setPostResult] = useState<any>(null);
    const [postData, setPostData] = useState<string>('{"name": "新しいアイテム", "value": 42}');

    // GETリクエストを実行
    const handleFetchData = async (endpoint: string) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiService.fetchData(endpoint);
            setData(result);
        } catch (err) {
            setError('データの取得中にエラーが発生しました');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // POSTリクエストを実行
    const handlePostData = async (endpoint: string) => {
        setLoading(true);
        setError(null);
        try {
            let dataToPost;
            try {
                dataToPost = JSON.parse(postData);
            } catch (err) {
                setError('無効なJSONデータです');
                setLoading(false);
                return;
            }

            const result = await apiService.postData(endpoint, dataToPost);
            setPostResult(result);
        } catch (err) {
            setError('データの送信中にエラーが発生しました');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // キャッシュをクリア
    const handleClearCache = () => {
        apiService.clearCache();
        setData(null);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>APIプロキシパターンのデモ</h1>

            <div style={{ marginBottom: '20px' }}>
                <h2>GETリクエスト</h2>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button
                        onClick={() => handleFetchData('/users')}
                        disabled={loading}
                    >
                        /users を取得
                    </button>
                    <button
                        onClick={() => handleFetchData('/products')}
                        disabled={loading}
                    >
                        /products を取得
                    </button>
                    <button onClick={handleClearCache}>
                        キャッシュをクリア
                    </button>
                </div>

                <div>
                    {loading && <p>読み込み中...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {data && (
                        <div>
                            <h3>レスポンス:</h3>
                            <pre style={{
                                backgroundColor: '#f5f5f5',
                                padding: '10px',
                                borderRadius: '5px',
                                maxHeight: '200px',
                                overflow: 'auto'
                            }}>
                {JSON.stringify(data, null, 2)}
              </pre>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h2>POSTリクエスト</h2>
                <div style={{ marginBottom: '10px' }}>
          <textarea
              value={postData}
              onChange={(e) => setPostData(e.target.value)}
              style={{
                  width: '100%',
                  height: '100px',
                  fontFamily: 'monospace',
                  padding: '10px',
                  borderRadius: '5px'
              }}
          />
                </div>

                <button
                    onClick={() => handlePostData('/items')}
                    disabled={loading}
                >
                    /items にPOST
                </button>

                {postResult && (
                    <div style={{ marginTop: '10px' }}>
                        <h3>POSTレスポンス:</h3>
                        <pre style={{
                            backgroundColor: '#f5f5f5',
                            padding: '10px',
                            borderRadius: '5px'
                        }}>
              {JSON.stringify(postResult, null, 2)}
            </pre>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                <h3>コンソールを確認してください</h3>
                <p>プロキシの動作（キャッシュヒット、ミスなど）を確認するためにブラウザのコンソールをご覧ください。</p>
                <p>同じエンドポイントを複数回クリックすると、キャッシュからデータが取得されます。</p>
                <p>「キャッシュをクリア」ボタンを押すとキャッシュが無効化され、再度APIリクエストが実行されます。</p>
            </div>
        </div>
    );
};

export default ApiDemo;