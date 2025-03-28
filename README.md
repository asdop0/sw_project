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

### **🔹 Frontend**
- JavaScript (ES6+)
- React (UI 개발)
- React Router (페이지 이동 관리)
- fetch API (REST API 통신)
- Daum Postcode API (주소 검색)
- Kakao Maps API (지도 연동)

### **🔹 Backend**
- Java 21
- Spring Boot (REST API 개발)
- Spring Security + JWT (인증/인가)
- Spring Data JPA (ORM)

### **🔹 API Gateway**
- Spring Cloud Gateway (API 라우팅 및 필터 적용)

### **🔹 Database**
- MySQL (데이터 저장)

### **🔹 DevOps & Deployment**
- Docker & Docker Compose (컨테이너 관리)
- Jenkins (CI/CD 자동화)
- ngrok (로컬 서버 외부 노출)
- VirtualBox (로컬 서버 환경 구축 및 애플리케이션 실행)

### **🔹 Collaboration & Tools**
- Git & GitHub (형상 관리)
- Postman (API 테스트)

## 주요 기능 (Key Features)
**캠핑장, 중고거래, 쇼핑몰** <br>
- 사용자는 각 페이지에서 원하는 항목을 검색 및 조회 할 수 있습니다. <br>
- 관리자 계정을 통해 캠핑장 정보나 상품 정보 등을 삽입, 수정, 삭제 할 수 있습니다. <br>
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
### 토큰 검사 및 인증/인가 처리 최적화
하나의 토큰을 사용하여 여러 서버에 요청을 보낼 때, 각 서버에서 토큰을 검사하는 방식은 비효율적이라고 판단했습니다. <br>
모든 요청은 게이트웨이를 통과해서 엔드 포인트로 전달되므로, 게이트웨이에서 토큰을 검사하도록 최적화하는 방법을 찾았습니다.<br>
이 과정에서 필터를 활용하여 엔드포인트에서 다음과 같이 인증/인가를 구분할 수 있게 되었습니다. <br>
- 토큰 없음: 인증되지 않은 요청 <br>
- 토큰 O: 인증된 사용자 <br>
- 토큰 O + 관리자 권한 O: 관리자 권한을 가진 사용자 <br>
이를 통해, 요청을 처리하는 효율성을 크게 향상시킬 수 있었습니다. <br>
### Jenkins에서 Docker 명령어 실행 권한 문제
Jenkins에서 Docker를 사용하여 빌드 및 배포 작업을 진행하려 했으나, Docker 명령어를 실행할 때 오류가 발생하였습니다. <br>
오류메시지를 통해 권한 문제인 것을 발견하고 Docker 명령어는 루트 권한을 요구하는 것을 인지하였습니다. <br>
Jenkins 사용자에게 sudo 권한을 부여하여 Docker 명령어를 실행할 수 있도록 설정하였습니다. <br>
/etc/sudoers 파일을 수정하여 권한을 부여했습니다. <br>
- jenkins ALL=(ALL) NOPASSWD: /usr/bin/docker
