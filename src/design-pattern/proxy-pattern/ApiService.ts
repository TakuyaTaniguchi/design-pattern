// src/design-pattern/proxy-pattern/ApiService.ts

/**
 * APIサービスのインターフェース
 */
export interface ApiServiceInterface {
    fetchData(endpoint: string): Promise<any>;
    postData(endpoint: string, data: any): Promise<any>;
}

/**
 * 実際のAPIサービスの実装
 */
export class RealApiService implements ApiServiceInterface {
    private baseUrl: string;

    constructor(baseUrl: string = 'https://api.example.com') {
        this.baseUrl = baseUrl;
        console.log('RealApiService: インスタンスが作成されました');
    }

    async fetchData(endpoint: string): Promise<any> {
        console.log(`RealApiService: ${this.baseUrl}${endpoint} からデータを取得します`);

        // 実際のAPI呼び出しをシミュレート
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, data: { id: 1, name: 'サンプルデータ' } });
            }, 500);
        });
    }

    async postData(endpoint: string, data: any): Promise<any> {
        console.log(`RealApiService: ${this.baseUrl}${endpoint} にデータを送信します`, data);

        // 実際のAPI呼び出しをシミュレート
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, id: Math.floor(Math.random() * 1000) });
            }, 500);
        });
    }
}

/**
 * APIサービスのプロキシ
 * - キャッシュ機能
 * - ロギング
 * - エラーハンドリング
 */
export class ApiServiceProxy implements ApiServiceInterface {
    private realService: RealApiService;
    private cache: Map<string, { data: any, timestamp: number }> = new Map();
    private cacheExpiry: number;

    constructor(baseUrl?: string, cacheExpiryMs: number = 30000) {
        this.realService = new RealApiService(baseUrl);
        this.cacheExpiry = cacheExpiryMs;
        console.log('ApiServiceProxy: インスタンスが作成されました');
    }

    async fetchData(endpoint: string): Promise<any> {
        console.log(`ApiServiceProxy: fetchData "${endpoint}" の呼び出しを処理中`);

        // キャッシュからデータを取得
        const cacheKey = endpoint;
        const cachedData = this.cache.get(cacheKey);
        const now = Date.now();

        // キャッシュが有効なら、キャッシュからデータを返す
        if (cachedData && now - cachedData.timestamp < this.cacheExpiry) {
            console.log(`ApiServiceProxy: "${endpoint}" のキャッシュデータを返します`);
            return cachedData.data;
        }

        try {
            // キャッシュがないか期限切れなら、実際のサービスを呼び出す
            console.log(`ApiServiceProxy: "${endpoint}" の新鮮なデータを取得します`);
            const data = await this.realService.fetchData(endpoint);

            // 結果をキャッシュに保存
            this.cache.set(cacheKey, { data, timestamp: Date.now() });

            return data;
        } catch (error) {
            console.error(`ApiServiceProxy: fetchData "${endpoint}" でエラーが発生しました`, error);
            throw error;
        }
    }

    async postData(endpoint: string, data: any): Promise<any> {
        console.log(`ApiServiceProxy: postData "${endpoint}" の呼び出しを処理中`);

        try {
            // POSTリクエストはキャッシュしない
            const result = await this.realService.postData(endpoint, data);

            // キャッシュを無効化 (同じエンドポイントのGETが古いデータを返さないように)
            this.invalidateCache(endpoint);

            return result;
        } catch (error) {
            console.error(`ApiServiceProxy: postData "${endpoint}" でエラーが発生しました`, error);
            throw error;
        }
    }

    /**
     * 特定のエンドポイントのキャッシュを無効化
     */
    invalidateCache(endpoint: string): void {
        console.log(`ApiServiceProxy: "${endpoint}" のキャッシュを無効化します`);
        this.cache.delete(endpoint);
    }

    /**
     * すべてのキャッシュを無効化
     */
    clearCache(): void {
        console.log('ApiServiceProxy: すべてのキャッシュをクリアします');
        this.cache.clear();
    }
}