import * as React from "react";
import { useState } from "react";

export default function VotePage() {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  
  const addOption = () => {
    setOptions([...options, ""]);
  };
  
  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  return (
    <>
      <h1>익명 투표 만들기</h1>
      
      <div>
        <label>
          투표 제목:
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="투표 제목을 입력하세요"
          />
        </label>
      </div>
      
      <div>
        <h2>투표 옵션</h2>
        {options.map((option, index) => (
          <div key={index}>
            <label>
              옵션 {index + 1}:
              <input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`옵션 ${index + 1}`}
              />
            </label>
          </div>
        ))}
        
        <button onClick={addOption}>
          옵션 추가
        </button>
      </div>
      
      <button>
        투표 생성하기
      </button>
    </>
  );
}