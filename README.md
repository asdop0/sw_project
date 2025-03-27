# 프로젝트 이름 (Project Name)
 **강원도 캠핑장 Web**
## 프로젝트 소개 (Introduction)
 공공데이터포탈에 등재된 캠핑장 정보를 사용자가 보기 편하게 출력합니다.
 또한 온라인 쇼핑몰을 구성하여 캠핑 용품을 판매하며 중고거래 환경을 조성하여 
 사용자 간의 대화의 장을 제공합니다.
## 프로젝트 목적 (Project Goal)
- 프론트엔드 - 백엔드 - 데이터베이스 간의 역할과 통신 방식 이해 <br>
-  Spring Boot 기반의 REST API 개발
## 프로젝트 개요 (Project Overview)
 | **개발 기간** | 2024.10.28 ~ 2024.12.12 <br> <br>
 | **개발 인원** | 2명(프론트엔드 1명, 백엔드 1명) <br> <br>
 | **담당 기능** | <br>
  **김승겸** - React UI 개발 <br>
  **안민석** - REST API 개발, 게이트웨이 구축, Docker 컨테이너화, CI/CD 구축, 사용자 인증
## 기술 스택 (Tech Stack)

## 주요 기능 (Key Features)
**캠핑장, 중고거래, 쇼핑몰** <br>
- 사용자는 각 페이지에서 원하는 항목을 검색 및 조회 할 수 있습니다. <br>
- 관리자 계정을 통해 캠핑장 정보나 상품 정보 등을 삽입, 수정, 삭제 할 수 있습니다. <br><br>
<img width="295" alt="KakaoTalk_20250327_164050947" src="https://github.com/user-attachments/assets/e2e1c712-2fb7-48f3-aee9-f99ccacb9a39" />

**로그인** <br>
- 특정 기능들은 로그인을 필요로 하며 비로그인일 경우 로그인 페이지로 이동시킵니다. <br><br>

**댓글** <br>
- 사용자는 로그인 후 댓글을 통해 소통할 수 있습니다. <br><br>

**기술적인 특징** <br>
- JPA를 사용하여 객체 지향적인 방식으로 데이터베이스를 관리합니다. <br>
- JWT를 이용하여 인증/인가를 처리합니다. <br>
- 게이트웨이를 구성하고 해당 게이트웨이의 필터에서 JWT 인증/인가 과정을 수행합니다. <br>
- Docker를 이용하여 게이트웨이 서버와 REST API 서버를 컨테이너화하여 실행합니다. <br>
- Jenkins를 이용하여 CI/CD 환경을 구축합니다. <br>

## 프로젝트 구조 (Project Structure)
<img width="307" alt="KakaoTalk_20250327_164129443" src="https://github.com/user-attachments/assets/edea8aa6-5893-49f8-8e63-cc07cbf4c99d" /> <br>
**Spring Boot** - sw-auth, sw-board, sw-camping, sw-store <br>
**Spring Cloud Gateway** - sw-gateway <br>
**React** - sw-react <br>
**Jenkins** - Jenkinsfile <br>
**Docker** - docker-compose.yml

## 트러블슈팅 (Troubleshooting)


