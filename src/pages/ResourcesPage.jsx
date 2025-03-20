import * as React from "react";
import { useState } from "react";

export default function ResourcesPage() {
  const [resources, setResources] = useState([
    { title: "깃허브 레포지토리", url: "https://drive.google.com/drive/folders/1KUABSxgW2zxazNB0knH1Zppf63pYLoNV?usp=drive_link", description: "동아리 코드 저장소" },
    { title: "학습 자료", url: "https://drive.google.com/drive/folders/1BQToG2ryYzwztIP2Mbm_GBevddY5xFr5?usp=drive_link", description: "프로그래밍 자료 모음" }
  ]);
  
  const [newResource, setNewResource] = useState({
    title: "",
    url: "",
    description: ""
  });
  
  const addResource = () => {
    if (newResource.title && newResource.url) {
      setResources([...resources, newResource]);
      setNewResource({ title: "", url: "", description: "" });
    } else {
      alert("제목과 URL을 입력해주세요!");
    }
  };
  
  return (
    <>
      <h1>자료 모음</h1>
      
      <div className="resources-list">
        {resources.map((resource, index) => (
          <div key={index} className="resource-card">
            <h2>{resource.title}</h2>
            <p>{resource.description}</p>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              바로가기
            </a>
          </div>
        ))}
      </div>
      
      <div className="add-resource">
        <h2>새 자료 추가</h2>
        <div className="form-group">
          <label>
            제목:
            <input
              value={newResource.title}
              onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
              placeholder="자료 제목"
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            URL:
            <input
              value={newResource.url}
              onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
              placeholder="https://example.com"
            />
          </label>
        </div>
        
        <div className="form-group">
          <label>
            설명:
            <textarea
              value={newResource.description}
              onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
              placeholder="자료에 대한 간단한 설명"
            />
          </label>
        </div>
        
        <button onClick={addResource} className="button primary">
          자료 추가
        </button>
      </div>
    </>
  );
}