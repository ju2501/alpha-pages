import React, { useState } from 'react';

function VotePage() {
  const [voteTitle, setVoteTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  
  // 여기에 투표 관련 로직 추가

  return (
    <div className="vote-page">
      <h1>익명 투표 만들기</h1>
      <input 
        type="text" 
        placeholder="투표 제목" 
        value={voteTitle} 
        onChange={(e) => setVoteTitle(e.target.value)} 
      />
      
      {/* 투표 옵션 입력 필드들 */}
      {options.map((option, index) => (
        <div key={index}>
          <input 
            type="text" 
            placeholder={`옵션 ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
          />
        </div>
      ))}
      
      <button onClick={() => setOptions([...options, ''])}>
        옵션 추가
      </button>
      
      <button>투표 생성하기</button>
    </div>
  );
}

export default VotePage;