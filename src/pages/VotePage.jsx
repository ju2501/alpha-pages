import * as React from "react";
import { useState, useEffect } from "react";

export default function VotePage() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [savedVotes, setSavedVotes] = useState([]);
  const [viewMode, setViewMode] = useState("create"); // create 또는 list
  
  // 로컬 스토리지에서 투표 데이터 불러오기
  useEffect(() => {
    const storedVotes = localStorage.getItem("alpacaVotes");
    if (storedVotes) {
      setSavedVotes(JSON.parse(storedVotes));
    }
  }, []);
  
  const addOption = () => {
    setOptions([...options, ""]);
  };
  
  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const createVote = () => {
    if (!title) {
      alert("투표 제목을 입력해주세요!");
      return;
    }
    
    if (options.filter(opt => opt.trim()).length < 2) {
      alert("최소 2개의 옵션을 입력해주세요!");
      return;
    }
    
    const newVote = {
      id: Date.now(),
      title,
      options: options.filter(opt => opt.trim()).map(text => ({ text, votes: 0 })),
      createdAt: new Date().toISOString(),
      isActive: true
    };
    
    const updatedVotes = [newVote, ...savedVotes];
    setSavedVotes(updatedVotes);
    localStorage.setItem("alpacaVotes", JSON.stringify(updatedVotes));
    
    // 폼 초기화
    setTitle("");
    setOptions(["", ""]);
    setViewMode("list");
    
    alert("투표가 생성되었습니다!");
  };
  
  const voteFor = (voteId, optionIndex) => {
    const updatedVotes = savedVotes.map(vote => {
      if (vote.id === voteId) {
        const updatedOptions = [...vote.options];
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          votes: updatedOptions[optionIndex].votes + 1
        };
        return { ...vote, options: updatedOptions };
      }
      return vote;
    });
    
    setSavedVotes(updatedVotes);
    localStorage.setItem("alpacaVotes", JSON.stringify(updatedVotes));
    alert("투표가 완료되었습니다!");
  };
  
  const closeVote = (voteId) => {
    const updatedVotes = savedVotes.map(vote => 
      vote.id === voteId ? { ...vote, isActive: false } : vote
    );
    setSavedVotes(updatedVotes);
    localStorage.setItem("alpacaVotes", JSON.stringify(updatedVotes));
  };
  
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>익명 투표 <span className="emoji">🦙</span></h1>
        
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'create' ? 'active' : ''}`}
            onClick={() => setViewMode("create")}
          >
            투표 만들기
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode("list")}
          >
            투표 목록
          </button>
        </div>
      </header>
      
      {viewMode === "create" ? (
        <div className="card">
          <div className="form-group">
            <label htmlFor="vote-title">투표 제목</label>
            <input
              id="vote-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="투표 제목을 입력하세요"
            />
          </div>
          
          <div className="form-group">
            <label>투표 옵션</label>
            {options.map((option, index) => (
              <div key={index} className="option-input">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`옵션 ${index + 1}`}
                />
              </div>
            ))}
            
            <button 
              type="button" 
              onClick={addOption} 
              className="button secondary"
            >
              옵션 추가
            </button>
          </div>
          
          <button 
            type="button" 
            onClick={createVote} 
            className="button primary"
          >
            투표 생성하기
          </button>
        </div>
      ) : (
        <div className="votes-list">
          {savedVotes.length > 0 ? (
            savedVotes.map(vote => (
              <div key={vote.id} className={`vote-card ${!vote.isActive ? 'inactive' : ''}`}>
                <div className="vote-header">
                  <h3>{vote.title}</h3>
                  <span className="vote-date">
                    {new Date(vote.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="vote-options">
                  {vote.options.map((option, idx) => (
                    <div key={idx} className="vote-option">
                      <div className="option-text">{option.text}</div>
                      
                      <div className="option-stats">
                        <div 
                          className="vote-bar" 
                          style={{ 
                            width: `${vote.options.reduce((a, b) => a + b.votes, 0) > 0 
                              ? (option.votes / vote.options.reduce((a, b) => a + b.votes, 0) * 100) 
                              : 0}%` 
                          }}
                        />
                        <span className="vote-count">{option.votes}</span>
                      </div>
                      
                      {vote.isActive && (
                        <button 
                          className="vote-button" 
                          onClick={() => voteFor(vote.id, idx)}
                        >
                          투표
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {vote.isActive && (
                  <button 
                    className="button secondary close-vote" 
                    onClick={() => closeVote(vote.id)}
                  >
                    투표 마감하기
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>아직 생성된 투표가 없습니다.</p>
              <button 
                className="button primary" 
                onClick={() => setViewMode("create")}
              >
                첫 투표 만들기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}