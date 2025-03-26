import * as React from "react";
import { useState } from "react";

export default function ResourcesPage() {
  const [resources, setResources] = useState([
    {
      title: "깃허브 레포지토리",
      url: "https://drive.google.com/drive/folders/1KUABSxgW2zxazNB0knH1Zppf63pYLoNV?usp=drive_link",
      description: "동아리 코드 저장소"
    },
    {
      title: "학습 자료",
      url: "https://drive.google.com/drive/folders/1BQToG2ryYzwztIP2Mbm_GBevddY5xFr5?usp=drive_link",
      description: "프로그래밍 자료 모음"
    }
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
    <div className="page-container">
      <header className="page-header">
        <h1>자료 모음 <span className="emoji">🦙</span></h1>
      </header>
      
      <div className="card">
        <div className="resources-list">
          {resources.map((resource, index) => (
            <div key={index} className="resource-item">
              <h2 className="resource-title">{resource.title}</h2>
              <p className="resource-description">{resource.description}</p>
              <a 
                href={resource.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="button secondary"
              >
                바로가기
              </a>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card add-resource-section">
        <h2 className="section-title">새 자료 추가</h2>
        
        <div className="form-group">
          <label htmlFor="resource-title">제목:</label>
          <input
            id="resource-title"
            value={newResource.title}
            onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
            placeholder="자료 제목"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="resource-url">URL:</label>
          <input
            id="resource-url"
            value={newResource.url}
            onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="resource-description">설명:</label>
          <textarea
            id="resource-description"
            value={newResource.description}
            onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
            placeholder="자료에 대한 간단한 설명"
            rows={3}
          />
        </div>
        
        <button onClick={addResource} className="button primary">
          자료 추가
        </button>
      </div>
    </div>
  );
}