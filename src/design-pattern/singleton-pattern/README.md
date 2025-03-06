# singleton-pattern

シングルトンパターンは、特定のクラスのインスタンスを 1 つだけ作成し、
それをグローバルに共有するデザインパターンです。

```typescript
class Singleton {
  private static instance: Singleton;

  private constructor() {
    console.log("Singleton instance created!");
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public sayHello() {
    console.log("Hello from Singleton!");
  }
}

// 使い方
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

instance1.sayHello(); // "Hello from Singleton!"

console.log(instance1 === instance2); // true

```

## アプリケーションのユースケース
1. 外部APIへの接続情報などを一元化する
2. 複数回実行される処理のうちのセットアップ
