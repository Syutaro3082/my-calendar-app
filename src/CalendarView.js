import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';

function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [allMemos, setAllMemos] = useState([]);
  const [memoText, setMemoText] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const today = new Date();
  const todayString = today.toDateString();

  const colorOptions = [
    { label: "仕事", color: "blue" },
    { label: "プライベート", color: "green" },
    { label: "重要", color: "red" }
  ];

  useEffect(() => {
    setMemoText("");
    setSelectedColors([]);
    setStartTime("");
    setEndTime("");
  }, [date]);

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const handleSave = () => {
    if (!memoText.trim()) {
      alert("メモ内容を入力してください！");
      return;
    }

    const currentDate = date.toDateString();

    const newMemo = {
      date: currentDate,
      memo: memoText,
      colors: selectedColors,
      startTime,
      endTime
    };

    setAllMemos(prev => [...prev, newMemo]);

    alert("保存しました！（Firestore機能はコメントアウト中）");

    setMemoText("");
    setSelectedColors([]);
    setStartTime("");
    setEndTime("");
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date: tileDate, view }) => {
          if (view === 'month') {
            const memosForDate = allMemos
              .filter(item => item.date === tileDate.toDateString());

            return memosForDate.length > 0 ? (
              <div style={{ fontSize: '10px', marginTop: '2px' }}>
                {memosForDate.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      color: item.colors[0] || "black",
                      overflow: "hidden"
                    }}
                  >
                    {item.startTime && item.endTime && (
                      <div>{item.startTime}〜{item.endTime}</div>
                    )}
                    <div>{item.memo}</div>
                  </div>
                ))}
              </div>
            ) : null;
          }
        }}
        tileClassName={({ date: tileDate, view }) => {
          if (view === 'month' && tileDate.toDateString() === todayString) {
            return 'today-highlight';
          }
          return null;
        }}
        className="custom-calendar"
      />

      <p>選択中の日付: {date.toDateString()}</p>

      <textarea
        placeholder="メモを入力"
        value={memoText}
        onChange={(e) => setMemoText(e.target.value)}
        rows={3}
        cols={40}
      />
      <br />

      <div style={{ marginTop: "8px" }}>
        <strong>タグを選択:</strong>
        {colorOptions.map(({ label, color }) => (
          <label key={color} style={{ marginRight: "8px" }}>
            <input
              type="checkbox"
              value={color}
              checked={selectedColors.includes(color)}
              onChange={() => toggleColor(color)}
            />
            <span style={{ color, fontWeight: "bold" }}>{label}</span>
          </label>
        ))}
      </div>

      <div style={{ marginTop: "8px" }}>
        <strong>開始時刻:</strong>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        &nbsp;&nbsp;
        <strong>終了時刻:</strong>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>

      <br />
      <button onClick={handleSave}>保存</button>

      <h2>📅 保存した予定一覧</h2>
      <ul>
        {allMemos.map((item, index) => (
          <li key={index}>
            <strong>{item.date}</strong> :
            {item.startTime && item.endTime && (
              <> {item.startTime}〜{item.endTime} </>
            )}
            &nbsp;
            <span style={{ color: item.colors[0] || "black" }}>{item.memo}</span>
            &nbsp;
            {item.colors.map((color, i) => (
              <span key={i} style={{ color, marginRight: "4px" }}>●</span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarView;
