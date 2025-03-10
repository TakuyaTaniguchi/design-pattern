// src/design-pattern/facade-pattern/MultimediaFacade.ts

/**
 * オーディオプレーヤーのサブシステム
 */
class AudioPlayer {
  private volume: number = 70;
  private isMuted: boolean = false;

  constructor() {
    console.log('AudioPlayer: 初期化されました');
  }

  play(file: string): void {
    console.log(`AudioPlayer: "${file}" を再生します (ボリューム: ${this.isMuted ? 'ミュート中' : this.volume}%)`);
  }

  pause(): void {
    console.log('AudioPlayer: 一時停止しました');
  }

  stop(): void {
    console.log('AudioPlayer: 停止しました');
  }

  setVolume(volume: number): void {
    if (volume < 0 || volume > 100) {
      throw new Error('ボリュームは0から100の間で設定してください');
    }
    this.volume = volume;
    console.log(`AudioPlayer: ボリュームを ${volume}% に設定しました`);
  }

  mute(): void {
    this.isMuted = true;
    console.log('AudioPlayer: ミュートしました');
  }

  unmute(): void {
    this.isMuted = false;
    console.log('AudioPlayer: ミュート解除しました');
  }
}

/**
 * ビデオプレーヤーのサブシステム
 */
class VideoPlayer {
  private brightness: number = 50;
  private contrast: number = 50;

  constructor() {
    console.log('VideoPlayer: 初期化されました');
  }

  play(file: string): void {
    console.log(`VideoPlayer: "${file}" を再生します`);
  }

  pause(): void {
    console.log('VideoPlayer: 一時停止しました');
  }

  stop(): void {
    console.log('VideoPlayer: 停止しました');
  }

  setBrightness(brightness: number): void {
    if (brightness < 0 || brightness > 100) {
      throw new Error('明るさは0から100の間で設定してください');
    }
    this.brightness = brightness;
    console.log(`VideoPlayer: 明るさを ${brightness}% に設定しました`);
  }

  setContrast(contrast: number): void {
    if (contrast < 0 || contrast > 100) {
      throw new Error('コントラストは0から100の間で設定してください');
    }
    this.contrast = contrast;
    console.log(`VideoPlayer: コントラストを ${contrast}% に設定しました`);
  }
}

/**
 * 字幕処理のサブシステム
 */
class SubtitleManager {
  private language: string = 'ja';
  private isEnabled: boolean = true;

  constructor() {
    console.log('SubtitleManager: 初期化されました');
  }

  loadSubtitles(file: string): void {
    console.log(`SubtitleManager: "${file}" の字幕をロードしました`);
  }

  setLanguage(language: string): void {
    this.language = language;
    console.log(`SubtitleManager: 言語を ${language} に設定しました`);
  }

  enable(): void {
    this.isEnabled = true;
    console.log('SubtitleManager: 字幕を有効にしました');
  }

  disable(): void {
    this.isEnabled = false;
    console.log('SubtitleManager: 字幕を無効にしました');
  }
}

/**
 * メディアライブラリのサブシステム
 */
class MediaLibrary {
  private mediaFiles: Map<string, { type: 'audio' | 'video', path: string }> = new Map();

  constructor() {
    console.log('MediaLibrary: 初期化されました');
    
    // サンプルデータを追加
    this.mediaFiles.set('music1', { type: 'audio', path: '/path/to/music1.mp3' });
    this.mediaFiles.set('video1', { type: 'video', path: '/path/to/video1.mp4' });
    this.mediaFiles.set('music2', { type: 'audio', path: '/path/to/music2.mp3' });
    this.mediaFiles.set('video2', { type: 'video', path: '/path/to/video2.mp4' });
  }

  getMediaFile(name: string): { type: 'audio' | 'video', path: string } | undefined {
    const file = this.mediaFiles.get(name);
    if (file) {
      console.log(`MediaLibrary: "${name}" (${file.path}) を取得しました`);
    } else {
      console.log(`MediaLibrary: "${name}" が見つかりませんでした`);
    }
    return file;
  }

  listMediaFiles(): string[] {
    const fileNames = Array.from(this.mediaFiles.keys());
    console.log(`MediaLibrary: ${fileNames.length}個のファイルが見つかりました`);
    return fileNames;
  }

  searchMediaFiles(query: string): string[] {
    const results = Array.from(this.mediaFiles.keys()).filter(name => name.includes(query));
    console.log(`MediaLibrary: "${query}" の検索結果: ${results.length}個のファイルが見つかりました`);
    return results;
  }
}

/**
 * マルチメディアシステムのためのファサード
 * 複数のサブシステムを統合して簡単に使えるようにする
 */
export class MultimediaFacade {
  private audioPlayer: AudioPlayer;
  private videoPlayer: VideoPlayer;
  private subtitleManager: SubtitleManager;
  private mediaLibrary: MediaLibrary;
  private currentMediaName: string | null = null;
  private currentMediaType: 'audio' | 'video' | null = null;
  private isPlaying: boolean = false;

  constructor() {
    console.log('MultimediaFacade: 初期化を開始します');
    
    // 各サブシステムを初期化
    this.audioPlayer = new AudioPlayer();
    this.videoPlayer = new VideoPlayer();
    this.subtitleManager = new SubtitleManager();
    this.mediaLibrary = new MediaLibrary();
    
    console.log('MultimediaFacade: 初期化が完了しました');
  }

  /**
   * メディアを再生する
   * - ファサードパターンの利点: 複数のサブシステムの連携を1つのメソッドに隠蔽
   */
  playMedia(mediaName: string): void {
    console.log(`MultimediaFacade: "${mediaName}" の再生を開始します`);
    
    // メディアライブラリからファイルを検索
    const mediaFile = this.mediaLibrary.getMediaFile(mediaName);
    
    if (!mediaFile) {
      console.error(`MultimediaFacade: "${mediaName}" が見つかりませんでした`);
      return;
    }

    // 現在再生中のメディアがあれば停止
    if (this.isPlaying) {
      this.stopMedia();
    }

    // メディアタイプに応じて適切なプレーヤーを使用
    if (mediaFile.type === 'audio') {
      this.audioPlayer.play(mediaFile.path);
    } else if (mediaFile.type === 'video') {
      this.videoPlayer.play(mediaFile.path);
      
      // ビデオの場合は字幕も読み込む（同じ名前の.srtファイルを想定）
      const subtitlePath = mediaFile.path.replace(/\.[^/.]+$/, '.srt');
      this.subtitleManager.loadSubtitles(subtitlePath);
    }
    
    this.currentMediaName = mediaName;
    this.currentMediaType = mediaFile.type;
    this.isPlaying = true;
    
    console.log(`MultimediaFacade: "${mediaName}" (${mediaFile.type}) の再生を開始しました`);
  }

  /**
   * 現在のメディアを一時停止する
   */
  pauseMedia(): void {
    if (!this.isPlaying || !this.currentMediaType) {
      console.log('MultimediaFacade: 再生中のメディアがありません');
      return;
    }
    
    if (this.currentMediaType === 'audio') {
      this.audioPlayer.pause();
    } else {
      this.videoPlayer.pause();
    }
    
    console.log('MultimediaFacade: メディアを一時停止しました');
  }

  /**
   * 現在のメディアを停止する
   */
  stopMedia(): void {
    if (!this.currentMediaType) {
      console.log('MultimediaFacade: 再生中のメディアがありません');
      return;
    }
    
    if (this.currentMediaType === 'audio') {
      this.audioPlayer.stop();
    } else {
      this.videoPlayer.stop();
    }
    
    this.isPlaying = false;
    console.log('MultimediaFacade: メディアを停止しました');
  }

  /**
   * ボリュームを設定する
   */
  setVolume(volume: number): void {
    this.audioPlayer.setVolume(volume);
  }

  /**
   * 字幕の言語を設定する
   */
  setSubtitleLanguage(language: string): void {
    this.subtitleManager.setLanguage(language);
  }

  /**
   * 字幕の表示/非表示を切り替える
   */
  toggleSubtitles(show: boolean): void {
    if (show) {
      this.subtitleManager.enable();
    } else {
      this.subtitleManager.disable();
    }
  }

  /**
   * ライブラリ内のメディアを検索する
   */
  searchMedia(query: string): string[] {
    return this.mediaLibrary.searchMediaFiles(query);
  }

  /**
   * 映像の明るさとコントラストを一度に設定する
   * - ファサードパターンの利点: 関連する操作をまとめて提供
   */
  adjustVideoQuality(brightness: number, contrast: number): void {
    console.log('MultimediaFacade: ビデオ品質を調整します');
    this.videoPlayer.setBrightness(brightness);
    this.videoPlayer.setContrast(contrast);
  }

  /**
   * 現在のメディア名を取得する
   */
  getCurrentMedia(): string | null {
    return this.currentMediaName;
  }

  /**
   * シアターモード（映画館のような設定）
   * - ファサードパターンの利点: 複雑な一連の処理を1つのメソッドにカプセル化
   */
  enableTheaterMode(): void {
    console.log('MultimediaFacade: シアターモードを有効にします');
    
    // オーディオ設定
    this.audioPlayer.setVolume(85);
    this.audioPlayer.unmute();
    
    // ビデオ設定
    this.videoPlayer.setBrightness(40);
    this.videoPlayer.setContrast(70);
    
    // 字幕設定
    this.subtitleManager.enable();
    
    console.log('MultimediaFacade: シアターモードが有効になりました');
  }

  /**
   * 各サブシステムへの直接アクセスを提供する（高度な操作用）
   * - ファサードパターンでも、必要に応じて詳細なアクセスを提供できる
   */
  getAudioPlayer(): AudioPlayer {
    return this.audioPlayer;
  }

  getVideoPlayer(): VideoPlayer {
    return this.videoPlayer;
  }

  getSubtitleManager(): SubtitleManager {
    return this.subtitleManager;
  }

  getMediaLibrary(): MediaLibrary {
    return this.mediaLibrary;
  }
}

// エクスポートするシングルトンインスタンス
export const multimediaSystem = new MultimediaFacade();