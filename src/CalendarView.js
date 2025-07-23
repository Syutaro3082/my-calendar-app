import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css';
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [memos, setMemos] = useState({});
  const [allMemos, setAllMemos] = useState([]); // ← 全ての予定を保存

  // Firestore から予定を取得
  useEffect(() => {
    const fetchMemos = async () => {
      const querySnapshot = await getDocs(collection(db, "schedules"));
      const memosData = {};
      const memosList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        memosData[data.date] = data.memo;
        memosList.push({ date: data.date, memo: data.memo });
      });
      setMemos(memosData);
      setAllMemos(memosList); // ← 一覧用
    };
    fetchMemos();
  }, []);

  const handleMemoChange = (e) => {
    setMemos({
      ...memos,
      [date.toDateString()]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "schedules"), {
        date: date.toDateString(),
        memo: memos[date.toDateString()]
      });
      alert("保存しました！");
      setAllMemos([...allMemos, { date: date.toDateString(), memo: memos[date.toDateString()] }]);
    } catch (e) {
      console.error("保存エラー: ", e);
    }
  };

  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={({ date, view }) =>
          view === 'month' && memos[date.toDateString()] ? (
            <span style={{ color: 'red' }}>●</span>
          ) : null
        }
        className="custom-calendar"
      />
      <p>選択中の日付: {date.toDateString()}</p>
      <textarea
        placeholder="メモを入力"
        value={memos[date.toDateString()] || ""}
        onChange={handleMemoChange}
        rows={4}
        cols={40}
      />
      <br />
      <button onClick={handleSave}>保存</button>

      <h2>📅 保存した予定一覧</h2>
      <ul>
        {allMemos.map((item, index) => (
          <li key={index}>
            <strong>{item.date}</strong> : {item.memo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarView;
