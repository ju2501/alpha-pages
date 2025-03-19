import * as React from "react";
import { useState } from "react";

export default function MealVotePage() {
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("lunch"); // lunch 또는 dinner
  const [options, setOptions] = useState(["", ""]);
  const [voteTitle, setVoteTitle] = useState("");
  
  // 점심/저녁 타입에 따라 기본 제목 설정
  React.useEffect(() => {
    if (mealType === "lunch") {
      setVoteTitle(voteTitle || "점심 배달음식 투표");
    } else {
      setVoteTitle(voteTitle || "저녁 뒷풀이 장소 투표");
    }
  }, [mealType]);
  
  const addOption = () => {
    setOptions([...options, ""]);
  };
  
  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const createVote = () => {
    // 투표 생성 로직 추가
    console.log("투표 생성:", { date, mealType, voteTitle, options });
    alert("투표가 생성되었습니다!");
  };
  
  return (
    <>
      <h1>식사 및 뒷풀이 투표</h1>
      
      <div className="form-group">
        <label>
          날짜:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      
      <div className="form-group">
        <label>식사 유형:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="mealType"
              value="lunch"
              checked={mealType === "lunch"}
              onChange={() => setMealType("lunch")}
            />
            점심 (배달음식)
          </label>
          <label>
            <input
              type="radio"
              name="mealType"
              value="dinner"
              checked={mealType === "dinner"}
              onChange={() => setMealType("dinner")}
            />
            저녁 (뒷풀이)
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>
          투표 제목:
          <input
            value={voteTitle}
            onChange={(e) => setVoteTitle(e.target.value)}
            placeholder={mealType === "lunch" ? "점심 배달음식 투표" : "저녁 뒷풀이 장소 투표"}
          />
        </label>
      </div>
      
      <div className="form-group">
        <h2>{mealType === "lunch" ? "배달음식 옵션" : "뒷풀이 장소 옵션"}</h2>
        {options.map((option, index) => (
          <div key={index} className="option-input">
            <label>
              옵션 {index + 1}:
              <input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={mealType === "lunch" ? "음식점 이름 또는 메뉴" : "장소 이름"}
              />
            </label>
          </div>
        ))}
        
        <button onClick={addOption} className="button">
          옵션 추가
        </button>
      </div>
      
      {mealType === "lunch" && (
        <div className="form-group">
          <h3>배달음식 참고사항</h3>
          <p>
            참여 인원에 따라 최소주문금액을 충족할 수 있는지 확인해주세요.
            알러지나 음식 제한이 있는 경우 미리 고려해주세요.
          </p>
        </div>
      )}
      
      {mealType === "dinner" && (
        <div className="form-group">
          <h3>뒷풀이 참고사항</h3>
          <p>
            장소의 수용 인원, 예약 필요 여부, 비용 등을 고려해주세요.
            대중교통 접근성도 참고하면 좋습니다.
          </p>
        </div>
      )}
      
      <button onClick={createVote} className="button primary">
        투표 생성하기
      </button>
    </>
  );
}