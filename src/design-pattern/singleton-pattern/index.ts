export class ConfigManager {
    private static instance: ConfigManager;
    private config: Record<string, any> = {};

    // プライベートコンストラクタでインスタンスの直接生成を防止
    private constructor() {
        console.log('ConfigManager インスタンスが作成されました');

        // デフォルト設定
        this.config = {
            apiUrl: 'https://api.example.com',
            theme: 'light',
            language: 'ja',
            pageSize: 10,
            features: {
                darkMode: true,
                notifications: true
            }
        };
    }

    /**
     * ConfigManagerのシングルトンインスタンスを取得
     */
    public static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }
}

export const configManager = ConfigManager.getInstance();