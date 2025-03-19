import * as React from "react";
import { useState } from "react";

export default function InsightsPage() {
  const [insights, setInsights] = useState([
    { 
      title: "리액트 최신 기능 소개", 
      url: "https://example.com/react-features", 
      author: "김코딩", 
      date: "2023-01-15"
    },
    { 
      title: "자바스크립트 성능 최적화 팁", 
      url: "https://example.com/js-optimization", 
      author: "박개발", 
      date: "2023-02-20"
    }
  ]);
  
  const [newInsight, setNewInsight] = useState({
    title: "",
    url: "",
    author: "",
    date: new Date().toISOString().split('T')[0]
  });
  
  const addInsight = () => {
    if (newInsight.title && newInsight.url && newInsight.author) {
      setInsights([...insights, newInsight]);
      setNewInsight({
        title: "",
        url: "",
        author: "",
        date: new Date().toISOString().split('T')[0]
      });
    } else {
      alert("제목, URL, 작성자를 모두 입력해주세요!");
    }
  };
  
  return (
    <>
      <h1>인사이트 공유</h1>
      
      <div className="insights-list">
        {insights.map((insight, index) => (
          <div key={index} className="insight-card">
            <h2>{insight.title}</h2>
            <div className="insight-meta">
              <span>작성자: {insight.author}</span>
              <span>날짜: {insight.date}</span>
            </div>
            <a href={insight.url} target="_blank" rel="noopener noreferrer">
              읽으러 가기
            </a>
          </div>
        ))}
      </div>
      
      <div className="add-insight">
        <h2>새 인사이트 공유</h2>
        <div className="form-group">
          <label>
            제목:
            <input
              value={newInsight.title}
              onChange={(e) => setNewInsight({ ...newInsight, title: e.target.value })}
              placeholder="인사이트 제목"
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            URL:
            <input
              value={newInsight.url}
              onChange={(e) => setNewInsight({ ...newInsight, url: e.target.value })}
              placeholder="https://example.com/article"
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            작성자:
            <input
              value={newInsight.author}
              onChange={(e) => setNewInsight({ ...newInsight, author: e.target.value })}
              placeholder="작성자 이름"
            />
          </label>
        </div>
        
        <button onClick={addInsight} className="button primary">
          인사이트 공유하기
        </button>
      </div>
    </>
  );
}