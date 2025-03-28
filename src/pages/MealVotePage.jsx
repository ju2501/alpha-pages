import React, { useState, useEffect } from "react";

export default function MealVotePage() {
  // 날짜 및 투표 관련 상태
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("lunch");
  const [options, setOptions] = useState(["", ""]);
  const [voteTitle, setVoteTitle] = useState("");
  
  // 주문 관련 상태
  const [orderTitle, setOrderTitle] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [menuName, setMenuName] = useState("");
  const [personName, setPersonName] = useState("");
  const [savedOrders, setSavedOrders] = useState([]);
  const [viewMode, setViewMode] = useState("vote"); // vote 또는 order
  
  // 가게 정보 관련 상태
  const [storeUrl, setStoreUrl] = useState("");
  const [storeName, setStoreName] = useState("");
  const [savedStores, setSavedStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showAddStoreForm, setShowAddStoreForm] = useState(false);
  
  // 데이터 불러오기
useEffect(() => {
  const fetchData = async () => {
    try {
      // 가게 정보 불러오기
      const storesResponse = await fetch('/.netlify/functions/stores');
      if (storesResponse.ok) {
        const storesData = await storesResponse.json();
        setSavedStores(storesData);
      } else {
        // API 호출 실패 시 로컬 스토리지에서 불러오기
        const storedStores = localStorage.getItem("alpacaStores");
        if (storedStores) {
          setSavedStores(JSON.parse(storedStores));
        }
      }
      
      // 주문 정보 불러오기
      const ordersResponse = await fetch('/.netlify/functions/orders');
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setSavedOrders(ordersData);
      } else {
        // API 호출 실패 시 로컬 스토리지에서 불러오기
        const storedOrders = localStorage.getItem("alpacaOrders");
        if (storedOrders) {
          setSavedOrders(JSON.parse(storedOrders));
        }
      }
    } catch (error) {
      console.error("데이터 로딩 오류:", error);
      // 오류 발생 시 로컬 스토리지에서 불러오기
      const storedStores = localStorage.getItem("alpacaStores");
      if (storedStores) {
        setSavedStores(JSON.parse(storedStores));
      }
      
      const storedOrders = localStorage.getItem("alpacaOrders");
      if (storedOrders) {
        setSavedOrders(JSON.parse(storedOrders));
      }
    }
  };
  
  fetchData();
}, []);
  
  // 식사 유형에 따른 기본 제목 설정
  useEffect(() => {
    if (mealType === "lunch") {
      setVoteTitle(voteTitle || "점심 배달음식 투표");
    } else {
      setVoteTitle(voteTitle || "저녁 뒷풀이 장소 투표");
    }
  }, [mealType]);
  
  const addStoreInfo = async () => {
  if (!storeName) {
    alert("가게 이름을 입력해주세요!");
    return;
  }
  
  const newStore = {
    name: storeName,
    url: storeUrl,
    addedAt: new Date().toLocaleString()
  };
  
  try {
    const response = await fetch('/.netlify/functions/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStore)
    });
    
    if (!response.ok) throw new Error('서버 응답 오류');
    const savedStore = await response.json();
    
    setSavedStores([...savedStores, savedStore]);
    setStoreName("");
    setStoreUrl("");
    setShowAddStoreForm(false);
    alert("가게 정보가 추가되었습니다!");
  } catch (error) {
    console.error('가게 정보 저장 오류:', error);
    // 오류 시 로컬 스토리지에 저장
    const storeWithId = { ...newStore, id: Date.now() };
    const updatedStores = [...savedStores, storeWithId];
    setSavedStores(updatedStores);
    localStorage.setItem("alpacaStores", JSON.stringify(updatedStores));
    
    setStoreName("");
    setStoreUrl("");
    setShowAddStoreForm(false);
    alert("가게 정보가 로컬에 저장되었습니다 (서버 연결 실패)");
  }
};
  
  // 가게 선택 함수
  const selectStore = (store) => {
    setSelectedStore(store);
    setOrderTitle(store.name);
  };
  
  // 가게 삭제 함수
  const deleteStore = (storeId, event) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    
    const updatedStores = savedStores.filter(store => store.id !== storeId);
    setSavedStores(updatedStores);
    localStorage.setItem("alpacaStores", JSON.stringify(updatedStores));
    
    // 선택된 가게가 삭제된 경우 선택 해제
    if (selectedStore && selectedStore.id === storeId) {
      setSelectedStore(null);
      setOrderTitle("");
    }
  };
  
  const addOption = () => {
    setOptions([...options, ""]);
  };
  
  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const createVote = () => {
    // 투표 생성 로직
    console.log("투표 생성:", { date, mealType, voteTitle, options });
    alert("투표가 생성되었습니다!");
    
    // 폼 초기화
    setOptions(["", ""]);
  };
  
  const addOrderItem = () => {
    if (!menuName || !personName) {
      alert("메뉴와 이름을 모두 입력해주세요!");
      return;
    }
    
    if (!selectedStore && !orderTitle) {
      alert("가게를 선택하거나 가게 이름을 입력해주세요!");
      return;
    }
    
    setOrderItems([...orderItems, { menu: menuName, person: personName }]);
    setMenuName("");
    setPersonName("");
  };
  
  const removeOrderItem = (index) => {
    const newItems = [...orderItems];
    newItems.splice(index, 1);
    setOrderItems(newItems);
  };
  
  const saveOrder = async () => {
  if (orderItems.length === 0) {
    alert("최소 한 개 이상의 주문 항목을 추가해주세요!");
    return;
  }
  
  if (!orderTitle) {
    alert("음식점 이름을 입력해주세요!");
    return;
  }
  
  const newOrder = {
    restaurant: orderTitle,
    storeUrl: selectedStore ? selectedStore.url : "",
    items: orderItems,
    date: new Date().toISOString()
  };
  
  try {
    const response = await fetch('/.netlify/functions/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder)
    });
    
    if (!response.ok) throw new Error('서버 응답 오류');
    const savedOrder = await response.json();
    
    setSavedOrders([savedOrder, ...savedOrders]);
    setOrderItems([]);
    setOrderTitle("");
    setSelectedStore(null);
    alert("주문 목록이 저장되었습니다!");
  } catch (error) {
    console.error('주문 저장 오류:', error);
    // 오류 시 로컬 스토리지에 저장
    const orderWithId = { ...newOrder, id: Date.now() };
    const updatedOrders = [orderWithId, ...savedOrders];
    setSavedOrders(updatedOrders);
    localStorage.setItem("alpacaOrders", JSON.stringify(updatedOrders));
    
    setOrderItems([]);
    setOrderTitle("");
    setSelectedStore(null);
    alert("주문 목록이 로컬에 저장되었습니다 (서버 연결 실패)");
  }
};
    
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: orderItems,
      restaurant: orderTitle,
      storeUrl: selectedStore ? selectedStore.url : ""
    };
    
    const updatedOrders = [newOrder, ...savedOrders];
    setSavedOrders(updatedOrders);
    localStorage.setItem("alpacaOrders", JSON.stringify(updatedOrders));
    
    // 폼 초기화
    setOrderItems([]);
    setOrderTitle("");
    setSelectedStore(null);
    alert("주문 목록이 저장되었습니다!");
  };
  
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>식사 및 뒷풀이 <span className="emoji">🦙</span></h1>
        
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === 'vote' ? 'active' : ''}`}
            onClick={() => setViewMode("vote")}
          >
            메뉴 투표
          </button>
          <button 
            className={`toggle-btn ${viewMode === 'order' ? 'active' : ''}`}
            onClick={() => setViewMode("order")}
          >
            주문 목록
          </button>
        </div>
      </header>
      
      {viewMode === "vote" ? (
        <div className="card">
          <div className="form-group">
            <label>날짜</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>식사 유형</label>
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
            <label>투표 제목</label>
            <input
              type="text"
              value={voteTitle}
              onChange={(e) => setVoteTitle(e.target.value)}
              placeholder={mealType === "lunch" ? "점심 배달음식 투표" : "저녁 뒷풀이 장소 투표"}
            />
          </div>
          
          <div className="form-group">
            <label>{mealType === "lunch" ? "배달음식 옵션" : "뒷풀이 장소 옵션"}</label>
            {options.map((option, index) => (
              <div key={index} className="option-input">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={mealType === "lunch" ? "음식점 이름 또는 메뉴" : "장소 이름"}
                />
              </div>
            ))}
            
            <button onClick={addOption} className="button secondary">
              옵션 추가
            </button>
          </div>
          
          <button onClick={createVote} className="button primary">
            투표 생성하기
          </button>
        </div>
      ) : (
        <div className="card">
          {/* 가게 목록 섹션 */}
          <div className="store-list-section">
            <div className="section-header">
              <h3>가게 정보</h3>
              <button 
                onClick={() => setShowAddStoreForm(!showAddStoreForm)} 
                className="button small"
              >
                {showAddStoreForm ? '취소' : '새 가게 추가'}
              </button>
            </div>
            
            {showAddStoreForm && (
              <div className="store-form">
                <div className="form-group">
                  <label>가게 이름</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="예) 종로 중국집"
                  />
                </div>
                
                <div className="form-group">
                  <label>네이버 지도 URL</label>
                  <div className="url-input-group">
                    <input
                      type="text"
                      value={storeUrl}
                      onChange={(e) => setStoreUrl(e.target.value)}
                      placeholder="https://map.naver.com/..."
                      className="store-url-input"
                    />
                    <button onClick={addStoreInfo} className="button secondary">
                      저장
                    </button>
                  </div>
                  <small className="helper-text">네이버 지도에서 가게 페이지 URL을 복사해서 붙여넣으세요</small>
                </div>
              </div>
            )}
            
            {savedStores.length > 0 && (
  <div className="store-list">
    <p className="helper-text">주문할 가게를 선택하세요</p>
    <div className="store-grid">
      {savedStores.map(store => (
        <div 
          key={store.id} 
          className={`store-item ${selectedStore && selectedStore.id === store.id ? 'selected' : ''}`}
          onClick={() => selectStore(store)}
        >
          <div className="store-info">
            <div className="store-name">{store.name}</div>
            {store.url && (
              <a 
                href={store.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="view-link"
                onClick={(e) => e.stopPropagation()}
              >
                지도
              </a>
            )}
          </div>
          <button 
            className="delete-store" 
            onClick={(e) => deleteStore(store.id, e)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  </div>
)}
            
            {!showAddStoreForm && savedStores.length === 0 && (
              <div className="empty-state">
                <p>저장된 가게가 없습니다. 새 가게를 추가해보세요!</p>
              </div>
            )}
          </div>
          
          {/* 주문 추가 섹션 */}
          <div className="form-group order-section">
            <h3>주문 추가하기</h3>
            
            <div className="form-group">
              <label>주문할 음식점 {selectedStore && '(선택됨)'}</label>
              <input
                type="text"
                value={orderTitle}
                onChange={(e) => {
                  setOrderTitle(e.target.value);
                  setSelectedStore(null); // 직접 입력시 선택 해제
                }}
                placeholder={selectedStore ? selectedStore.name : "예) 종로 중국집"}
                className={selectedStore ? "highlighted-input" : ""}
              />
            </div>
            
            <div className="order-form">
              <input
                type="text"
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                placeholder="메뉴명"
                className="menu-input"
              />
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="주문자"
                className="person-input"
              />
              <button onClick={addOrderItem} className="button add-item">
                추가
              </button>
            </div>
          </div>
          
          {orderItems.length > 0 && (
            <>
              <div className="order-list-container">
                <h3>현재 주문 목록</h3>
                <div className="current-restaurant">
                  <strong>주문 가게:</strong> {orderTitle || "(가게 이름 없음)"}
                </div>
                <ul className="order-list">
                  {orderItems.map((item, index) => (
                    <li key={index} className="order-item">
                      <span className="order-menu">{item.menu}</span>
                      <span className="order-divider">-</span>
                      <span className="order-person">{item.person}</span>
                      <button 
                        className="remove-item" 
                        onClick={() => removeOrderItem(index)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="order-summary">
                  <div>총 {orderItems.length}개 주문</div>
                </div>
              </div>
              
              <button onClick={saveOrder} className="button primary">
                주문 목록 저장하기
              </button>
              </>
          )}
          
          {savedOrders.length > 0 && (
            <div className="saved-orders">
              <h3>이전 주문 내역</h3>
              {savedOrders.map(order => (
                <div key={order.id} className="saved-order-card">
                  <div className="saved-order-header">
                    <h4>{order.restaurant}</h4>
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                    {order.storeUrl && (
                      <a 
                        href={order.storeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="view-map-link"
                      >
                        지도 보기
                      </a>
                    )}
                  </div>
                  <ul className="order-list">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="order-item">
                        <span className="order-menu">{item.menu}</span>
                        <span className="order-divider">-</span>
                        <span className="order-person">{item.person}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
