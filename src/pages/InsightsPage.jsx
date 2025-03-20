import * as React from "react";
import { useState, useEffect } from "react";

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [newInsight, setNewInsight] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
    author: "",
    date: new Date().toISOString().split('T')[0]
  });
  const [filter, setFilter] = useState("");
  const [activeTag, setActiveTag] = useState("");
  
  // 로컬 스토리지에서 인사이트 데이터 불러오기
  useEffect(() => {
    const storedInsights = localStorage.getItem("alpacaInsights");
    if (storedInsights) {
      setInsights(JSON.parse(storedInsights));
    }
  }, []);
  
  const addInsight = () => {
    if (!newInsight.title || !newInsight.url) {
      alert("제목과 URL은 필수 입력사항입니다!");
      return;
    }
    
    // 태그를 배열로 변환
    const tagsArray = newInsight.tags.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    const insightToAdd = {
      ...newInsight,
      id: Date.now(),
      tags: tagsArray,
      likes: 0,
      date: newInsight.date || new Date().toISOString().split('T')[0]
    };
    
    const updatedInsights = [insightToAdd, ...insights];
    setInsights(updatedInsights);
    localStorage.setItem("alpacaInsights", JSON.stringify(updatedInsights));
    
    // 폼 초기화
    setNewInsight({
      title: "",
      url: "",
      description: "",
      tags: "",
      author: "",
      date: new Date().toISOString().split('T')[0]
    });
    
    alert("인사이트가 성공적으로 공유되었습니다!");
  };
  
  const handleLike = (id) => {
    const updatedInsights = insights.map(insight => 
      insight.id === id ? { ...insight, likes: insight.likes + 1 } : insight
    );
    setInsights(updatedInsights);
    localStorage.setItem("alpacaInsights", JSON.stringify(updatedInsights));
  };
  
  // 태그 필터링 기능
  const filterByTag = (tag) => {
    setActiveTag(tag === activeTag ? "" : tag);
  };
  
  // 모든 태그 가져오기
  const getAllTags = () => {
    const allTags = [];
    insights.forEach(insight => {
      insight.tags.forEach(tag => {
        if (!allTags.includes(tag)) {
          allTags.push(tag);
        }
      });
    });
    return allTags;
  };
  
  // 검색과 태그로 필터링된 인사이트
  const filteredInsights = insights.filter(insight => {
    const matchesSearch = filter === "" || 
      insight.title.toLowerCase().includes(filter.toLowerCase()) ||
      insight.description.toLowerCase().includes(filter.toLowerCase()) ||
      insight.author.toLowerCase().includes(filter.toLowerCase());
    
    const matchesTag = activeTag === "" || 
      (insight.tags && insight.tags.includes(activeTag));
    
    return matchesSearch && matchesTag;
  });
  
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>인사이트 공유 <span className="emoji">🦙</span></h1>
      </header>
      
      <div className="card">
        <h2 className="section-title">새 인사이트 공유하기</h2>
        
        <div className="form-group">
          <label htmlFor="insight-title">제목*</label>
          <input
            id="insight-title"
            type="text"
            value={newInsight.title}
            onChange={(e) => setNewInsight({ ...newInsight, title: e.target.value })}
            placeholder="인사이트 제목을 입력하세요"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="insight-url">URL*</label>
          <input
            id="insight-url"
            type="text"
            value={newInsight.url}
            onChange={(e) => setNewInsight({ ...newInsight, url: e.target.value })}
            placeholder="https://example.com/article"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="insight-description">내용 요약</label>
          <textarea
            id="insight-description"
            value={newInsight.description}
            onChange={(e) => setNewInsight({ ...newInsight, description: e.target.value })}
            placeholder="간단한 요약이나 배울 점을 공유해보세요"
            rows={3}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group half">
            <label htmlFor="insight-tags">태그</label>
            <input
              id="insight-tags"
              type="text"
              value={newInsight.tags}
              onChange={(e) => setNewInsight({ ...newInsight, tags: e.target.value })}
              placeholder="javascript, react, design (쉼표로 구분)"
            />
          </div>
          
          <div className="form-group half">
            <label htmlFor="insight-author">작성자</label>
            <input
              id="insight-author"
              type="text"
              value={newInsight.author}
              onChange={(e) => setNewInsight({ ...newInsight, author: e.target.value })}
              placeholder="이름 (선택사항)"
            />
          </div>
        </div>
        
        <button onClick={addInsight} className="button primary">
          인사이트 공유하기
        </button>
      </div>
      
      <div className="insights-container">
        <div className="insights-header">
          <h2 className="section-title">공유된 인사이트</h2>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="검색..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        
        {getAllTags().length > 0 && (
          <div className="tags-filter">
            {getAllTags().map(tag => (
              <button
                key={tag}
                className={`tag-button ${activeTag === tag ? 'active' : ''}`}
                onClick={() => filterByTag(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
        
        {filteredInsights.length > 0 ? (
          <div className="insights-list">
            {filteredInsights.map(insight => (
              <div key={insight.id} className="insight-card">
                <div className="insight-card-header">
                  <h3 className="insight-title">{insight.title}</h3>
                  <div className="insight-meta">
                    {insight.author && <span className="insight-author">by {insight.author}</span>}
                    <span className="insight-date">{new Date(insight.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {insight.description && (
                  <p className="insight-description">{insight.description}</p>
                )}
                
                <div className="insight-tags">
                  {insight.tags && insight.tags.map(tag => (
                    <span key={tag} className="insight-tag" onClick={() => filterByTag(tag)}>
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="insight-actions">
                  <a 
                    href={insight.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="button secondary small"
                  >
                    읽으러 가기
                  </a>
                  
                  <button 
                    className="like-button" 
                    onClick={() => handleLike(insight.id)}
                  >
                    <span className="like-icon">❤️</span>
                    <span className="like-count">{insight.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            {filter || activeTag ? (
              <p>검색 조건에 맞는 인사이트가 없습니다</p>
            ) : (
              <p>아직 공유된 인사이트가 없습니다. 첫 인사이트를 공유해보세요!</p>
            )}
          </div>
        )}
      </div>
      
      {/* 알파카 마스코트 */}
      <div className="alpaca-mascot">🦙</div>
    </div>
  );
}