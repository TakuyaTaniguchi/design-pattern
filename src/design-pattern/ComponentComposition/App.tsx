import React from 'react';
import { Card } from './components/Card';
import { Button } from './components/Button';
import { Layout } from './components/Layout';

// コンポジションの利用例
export const App = () => {
    return (
        <Layout>
            <Layout.Header>
                <h1>ダッシュボード</h1>
            </Layout.Header>

            <Layout.Content>
                <Card>
                    <Card.Header>
                        <Card.Title>売上レポート</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>四半期の売上が15%増加しました。</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success">詳細を見る</Button>
                    </Card.Footer>
                </Card>
            </Layout.Content>
        </Layout>
    );
};
