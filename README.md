#  🏫 Kumoh-Talk

> 국립금오공과대학교 학생들의 교내 IT 교류를 위한 커뮤니티 및 온라인 세미나 플랫폼

## 📖 프로젝트 소개

### 개요

Kumoh-Talk는 교내에서 학습한 기술과 지식을 나누기 위한 IT 기술 블로그 서비스입니다.  
학교 내 학생들 간의 지식 공유가 부족하고 소극적인 분위기를 개선하고자, 자유롭게 공부한 내용을 공유할 수 있는 공간을 만들기 위해 시작되었습니다.  
오프라인 시범 운영 후, IT 학생이 참여하는 행사로 성장했으며, 이를 온라인에서도 지속할 수 있도록 기술 블로그를 개발하게 되었습니다.

[Kumoh-Talk 5W1H 기획안](https://github.com/Kumoh-talk/kumoh-talk-Frontend/wiki/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%84%A4%EB%AA%85)

[Kumoh-Talk 유튜브](https://www.youtube.com/@midnight_kumoh_talk)
#### 핵심 기능 요약
- **모집글 작성**: 스터디/프로젝트/멘토링 관련 모집글을 작성하고, 신청폼을 만들 수 있습니다.
- **신청서**: 지원자는 신청폼을 작성하고, 모집글 작성자는 신청서를 확인할 수 있습니다.
- **실시간 세미나**: 온라인으로 세미나 스트리밍을 진행할 수 있습니다. 시청자는 채팅/Q&A/투표 기능을 활용해서 발표자 및 다른 시청자들과 상호작용 할 수 있으며, AI를 활용한 사용자 맞춤 기반 정보 제공 기능을 통해 배경지식에 구애받지 않고 시청할 수 있습니다.
- **공지사항**: 세미나 혹은 플랫폼에 대한 공지사항을 제공합니다.
#### 유저 권한
```mermaid
classDiagram

    class ROLE_ADMIN {
        ROLE_ADMIN: 관리용 계정
    }

    class ROLE_GUEST {
        ROLE_GUEST: 정보가 존재하지 않는 첫 로그인한 사용자
    }

    class ROLE_USER {
        ROLE_USER: 일반 사용자 (댓글 작성 및 뉴스레터 구독 같은 자잘한 활동 가능)
    }

    class ROLE_ACTIVE_USER {
        ROLE_ACTIVE_USER: 추가정보를 입력한 사용자 (세미나 신청, 스터디/프로젝트 글 작성 및 신청 가능)
    }

    class ROLE_SEMINAR_WRITER {
        ROLE_SEMINAR_WRITER: 세미나 신청을 한 번 이상한 사용자 (세미나 글 작성 가능)
    }

    class Annonymous {
        Annonymous: 비인증 회원
    }

    ROLE_ADMIN <|-- ROLE_SEMINAR_WRITER : 관리자
    ROLE_SEMINAR_WRITER <|-- ROLE_ACTIVE_USER : 세미나 신청자
    ROLE_ACTIVE_USER <|-- ROLE_USER : 추가정보 입력 사용자
    ROLE_USER <|-- ROLE_GUEST : 일반 사용자
    ROLE_GUEST <|-- Annonymous : 회원가입


```
## 🎨 페이지 별 기능 상세

### 메인 화면

- 세미나 진행 상황, 공지사항, 모집글을 모두 확인할 수 있습니다.
#### 금오톡 메인 화면 이미지
![Adobe Express - 금오톡 메인화면](https://github.com/user-attachments/assets/be975c12-c81c-4c6d-b8eb-b8dcdb8ce8c0)
### 모집글 작성

- 스터디/프로젝트/멘토링 카테고리를 선택해서 모집글을 작성할 수 있습니다.
- 프론트엔드, 백엔드 등 기술 분야 카테고리를 선택할 수 있습니다.
- 신청자가 작성할 신청폼을 생성할 수 있습니다.

#### 금오톡 모집글 작성 이미지
![Adobe Express - 금오톡 모집글 작성 화면](https://github.com/user-attachments/assets/9d63cf58-0bbc-4dfd-bdfb-94d4e63d3b94)

### 모집글 신청

- 참여하기 원하는 모집글에 신청할 수 있습니다.
- 신청폼을 작성하여 제출할 수 있습니다.
- 모집 기간이 완료된 경우 신청할 수 없습니다.
- 작성자는 신청자의 신청폼 작성 내용을 확인할 수 있습니다.

#### 금오톡 모집글 신청 화면
![Adobe Express - 금오톡 신청 화면1](https://github.com/user-attachments/assets/4d8ffa9d-16f6-401a-9f68-ccb0675f4146)
#### 금오톡 모집글 모집 기간이 완료된 신청 화면
![Adobe Express - 금오톡 신청 화면2](https://github.com/user-attachments/assets/1284c1a0-ba93-46bc-a1f9-6940bf7e553c)
#### 금오톡 모집글 신청자 확인
![Adobe Express - 금오톡 신청자 확인 화면](https://github.com/user-attachments/assets/f644214a-9861-4845-b457-f558afbc1edb)

### 실시간 세미나 스트리밍

- 현재 송출중인 스트리밍 중, 원하는 세션에 참여할 수 있습니다.
- 발표자 및 다른 시청자들과 소통하기 위해 실시간 채팅을 활용할 수 있습니다.
- 발표자에게 궁금한 부분을 질문하기 위해 Q&A 기능을 활용할 수 있습니다.
- 발표자가 투표를 생성하면 자동으로 투표창이 활성화되어 투표에 참여할 수 있습니다.
- 5분 주기로 세미나 내용 요약이 생성되며, 전문 용어에 마우스를 올리면 용어 사전을 확인할 수 있습니다.
- 
#### 실시간 세미나 스트리밍 이미지

<img width="984" height="418" alt="image" src="https://github.com/user-attachments/assets/ff0e2725-e6c5-4792-89d1-1bfac5ce7284" />

#### 채팅 이미지

<img width="168" height="275" alt="image" src="https://github.com/user-attachments/assets/3352d2d7-1ab6-4c67-9283-7d995a0986e0" />

#### Q&A 이미지

<img width="194" height="277" alt="image" src="https://github.com/user-attachments/assets/5930aebd-47b8-4f04-a485-6d5a1cbd80b5" />

#### 투표 이미지

<img width="405" height="248" alt="image" src="https://github.com/user-attachments/assets/e36221a7-9573-44f4-8915-b90af222f80a" />

### 마이페이지

- 회원 정보를 확인할 수 있습니다.

![Adobe Express - 금오톡 마이페이지](https://github.com/user-attachments/assets/34f0562f-67d8-4aac-92ed-65c397efe4f1)

## 🏗️ 기술 스택
### Frontend
- **언어**: TypeScript
- **프레임워크**: Next.js v14
- **스타일링**: SCSS Module
- **패키지 매니저**: yarn
- **전역 상태 관리**: Zustand
- **라이브러리**: React-Hook-Form, Zod, HLS, TipTap
## 📂 프로젝트 구조
```
kumoh-talk
├── public [정적 파일들을 모아놓은 디렉토리]
├── src
│   └── app [프로젝트의 라우트를 결정하는 디렉토리]
│   │   ├── api [API Route]
│   │   ├── components [컴포넌트를 모아놓은 디렉토리]
│   │   └── lib [API 요청, 커스텀 훅, types 등 유틸 함수를 모아놓은 디렉토리]
│   └── middleware.ts [페이지에 대한 권한 체크 미들웨어]
├── package.json
└── yarn.lock
```
