// src/design-pattern/facade-pattern/FacadeDemo.tsx

import React, { useState } from 'react';
import { multimediaSystem } from './MultimediaFacade';

const FacadeDemo: React.FC = () => {
  const [currentMedia, setCurrentMedia] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(70);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState<boolean>(true);
  const [brightness, setBrightness] = useState<number>(50);
  const [contrast, setContrast] = useState<number>(50);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // コンソールログをキャプチャして表示する
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    originalConsoleLog(...args);
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    setLogs(prevLogs => [message, ...prevLogs.slice(0, 9)]);
  };

  // メディアの再生
  const handlePlay = (mediaName: string) => {
    multimediaSystem.playMedia(mediaName);
    setCurrentMedia(mediaName);
    setIsPlaying(true);
  };

  // メディアの一時停止
  const handlePause = () => {
    multimediaSystem.pauseMedia();
    setIsPlaying(false);
  };

  // メディアの停止
  const handleStop = () => {
    multimediaSystem.stopMedia();
    setIsPlaying(false);
    setCurrentMedia(null);
  };

  // ボリューム変更
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    multimediaSystem.setVolume(newVolume);
  };

  // 字幕の表示/非表示
  const handleSubtitleToggle = () => {
    const newState = !subtitlesEnabled;
    setSubtitlesEnabled(newState);
    multimediaSystem.toggleSubtitles(newState);
  };

  // ビデオ品質の調整
  const handleQualityChange = () => {
    multimediaSystem.adjustVideoQuality(brightness, contrast);
  };

  // シアターモードを有効にする
  const handleTheaterMode = () => {
    multimediaSystem.enableTheaterMode();
    setVolume(85);
    setBrightness(40);
    setContrast(70);
    setSubtitlesEnabled(true);
  };

  // メディア検索
  const handleSearch = () => {
    const results = multimediaSystem.searchMedia(searchQuery);
    setSearchResults(results);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>ファサードパターンのデモ</h1>
      <p>
        このデモでは、複数のサブシステム（オーディオプレーヤー、ビデオプレーヤー、字幕マネージャー、メディアライブラリ）を
        統合したマルチメディアシステムのファサードを使用しています。
      </p>

      {/* メディア再生コントロール */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>メディア再生</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button onClick={() => handlePlay('music1')} disabled={isPlaying && currentMedia === 'music1'}>
            音楽1を再生
          </button>
          <button onClick={() => handlePlay('music2')} disabled={isPlaying && currentMedia === 'music2'}>
            音楽2を再生
          </button>
          <button onClick={() => handlePlay('video1')} disabled={isPlaying && currentMedia === 'video1'}>
            ビデオ1を再生
          </button>
          <button onClick={() => handlePlay('video2')} disabled={isPlaying && currentMedia === 'video2'}>
            ビデオ2を再生
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button onClick={handlePause} disabled={!isPlaying}>
            一時停止
          </button>
          <button onClick={handleStop} disabled={!currentMedia}>
            停止
          </button>
        </div>

        {currentMedia && (
          <div style={{ padding: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
            <p>現在再生中: <strong>{currentMedia}</strong> ({isPlaying ? '再生中' : '一時停止'})</p>
          </div>
        )}
      </div>

      {/* オーディオ設定 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>オーディオ設定</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="volume">ボリューム: {volume}%</label>
          <br />
          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* ビデオ設定 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>ビデオ設定</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="brightness">明るさ: {brightness}%</label>
          <br />
          <input
            id="brightness"
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="contrast">コントラスト: {contrast}%</label>
          <br />
          <input
            id="contrast"
            type="range"
            min="0"
            max="100"
            value={contrast}
            onChange={(e) => setContrast(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>

        <button onClick={handleQualityChange}>
          ビデオ品質を適用
        </button>
      </div>

      {/* 字幕設定 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>字幕設定</h2>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={subtitlesEnabled}
              onChange={handleSubtitleToggle}
            />
            字幕を表示
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>字幕言語:</label>
          <select 
            onChange={(e) => multimediaSystem.setSubtitleLanguage(e.target.value)}
            defaultValue="ja"
          >
            <option value="ja">日本語</option>
            <option value="en">英語</option>
            <option value="fr">フランス語</option>
            <option value="de">ドイツ語</option>
          </select>
        </div>
      </div>

      {/* メディア検索 */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>メディア検索</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="検索ワード"
            style={{ flex: 1, padding: '5px' }}
          />
          <button onClick={handleSearch}>検索</button>
        </div>

        {searchResults.length > 0 && (
          <div>
            <h3>検索結果:</h3>
            <ul>
              {searchResults.map(result => (
                <li key={result}>
                  {result}
                  <button 
                    onClick={() => handlePlay(result)}
                    style={{ marginLeft: '10px', fontSize: '0.8em' }}
                  >
                    再生
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* プリセット */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>システムプリセット</h2>
        <button onClick={handleTheaterMode}>
          シアターモードを有効化
        </button>
        <p><small>シアターモードでは、音量85%、明るさ40%、コントラスト70%、字幕有効になります</small></p>
      </div>

      {/* ログ表示 */}
      <div style={{ marginTop: '30px', border: '1px solid #ccc', borderRadius: '5px', padding: '15px' }}>
        <h3>サブシステムの動作ログ</h3>
        <div style={{ 
          backgroundColor: '#000', 
          color: '#00ff00', 
          fontFamily: 'monospace', 
          padding: '10px',
          borderRadius: '5px',
          height: '200px',
          overflowY: 'scroll'
        }}>
          {logs.map((log, index) => (
            <div key={index}>&gt; {log}</div>
          ))}
        </div>
      </div>

      {/* ファサードパターンの説明 */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e6f7ff', borderRadius: '5px' }}>
        <h3>ファサードパターンについて</h3>
        <p>
          ファサードパターンは、複雑なサブシステムに対してシンプルなインターフェースを提供するデザインパターンです。
          このデモでは、複数のサブシステム（オーディオプレーヤー、ビデオプレーヤー、字幕マネージャー、メディアライブラリ）を
          単一のファサードクラス（MultimediaFacade）を通じて簡単に利用できます。
        </p>
        <p>
          例えば、ファサードがないと、動画を再生するためには次のような複数のステップが必要です：
        </p>
        <ol>
          <li>メディアライブラリでファイルを検索</li>
          <li>ファイルの種類を判断</li>
          <li>適切なプレーヤーを選択</li>
          <li>プレーヤーの設定</li>
          <li>字幕の読み込みと設定</li>
        </ol>
        <p>
          しかし、ファサードパターンを使用すると、単に <code>multimediaSystem.playMedia('video1')</code> と呼び出すだけで、
          これらすべての処理が内部的に行われます。
        </p>
      </div>
    </div>
  );
};

export default FacadeDemo;