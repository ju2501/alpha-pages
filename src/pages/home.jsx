import * as React from "react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div>
      <header className="app-header">
        <h1>
          알파 <span className="emoji">💻</span>
        </h1>
      </header>
      
      <div className="card welcome-card">
        <div className="welcome-title">
          동아리 활동 페이지
        </div>
        
        <Link href="/vote" className="feature-item">
  <span className="emoji">📊</span>
  <span>익명 투표로 의견 모으기</span>
</Link>
<Link href="/meal" className="feature-item">
  <span className="emoji">🍔</span>
  <span>점심 배달/식사 정하기</span>
</Link>
<Link href="/resources" className="feature-item">
  <span className="emoji">📚</span>
  <span>유용한 자료 링크 모음</span>
</Link>
<Link href="/insights" className="feature-item">
  <span className="emoji">💡</span>
  <span>인사이트 및 지식 공유</span>
</Link>
      </div>
      
      <div className="next-meeting">
        <div className="next-meeting-title">
          <span className="emoji">📅</span> 다음 모임 정보
        </div>
        <div className="next-meeting-info">
          2025-03-25 19:00 & 2025-03-24 11:40 
        </div>
        <div className="next-meeting-topic">
          주제: 개발 환경 설정 및 API 기본 사용
        </div>
      </div>
      
      <div className="quick-actions">
        <Link href="/vote">
          <div className="action-button">
            <span className="button-icon">📋</span> 투표 만들기
          </div>
        </Link>
        <Link href="/meal">
          <div className="action-button">
            <span className="button-icon">🍽️</span> 투표 현황
          </div>
        </Link>
      </div>
    </div>
  );
}