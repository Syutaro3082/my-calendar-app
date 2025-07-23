import React from 'react';
import './App.css';
import CalendarView from './CalendarView'; // カレンダーコンポーネントをインポート

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>カレンダー共有アプリ</h1>
        <CalendarView /> {/* カレンダーを表示 */}
      </header>
    </div>
  );
}

export default App;
