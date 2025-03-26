const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// JSON Server 설정
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// API 라우트
app.use('/api', middlewares, router);

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'dist')));

// SPA를 위한 라우팅
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});