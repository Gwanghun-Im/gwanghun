# 개인 블로그 프로젝트

Next.js를 사용하여 개발된 `gwanghun`입니다.

## 프로젝트 구조

```
.
├── app/ # Next.js 13+ App Router 구조
├── components/ # Atomic Design 패턴을 따르는 컴포넌트
│ ├── atoms/ # 가장 기본적인 컴포넌트 (버튼, 입력 필드 등)
│ ├── molecules/ # atoms를 조합한 컴포넌트 (검색 폼, 카드 등)
│ ├── organisms/ # molecules를 조합한 더 복잡한 컴포넌트 (헤더, 푸터 등)
│ ├── templates/ # 페이지 레이아웃을 구성하는 컴포넌트
│ └── ui/ # 공통 UI 컴포넌트
├── hooks/ # 커스텀 React hooks
├── lib/ # 유틸리티 함수 및 외부 라이브러리 설정
├── markdown/ # 블로그 포스트 마크다운 파일
├── public/ # 정적 파일 (이미지, 폰트 등)
├── store/ # 상태 관리 저장소
├── styles/ # CSS 및 스타일 관련 파일
├── types/ # TypeScript 타입 정의
└── utils/ # 유틸리티 함수
```

### 컴포넌트 구조

이 프로젝트는 [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) 방법론을 따라 컴포넌트를 구성했습니다:

#### Atoms (원자)

- 가장 기본적인 빌딩 블록
- 예: 버튼, 입력 필드, 라벨, 아이콘 등

#### Molecules (분자)

- Atoms를 결합하여 만든 단일 기능 컴포넌트
- 예: 검색 입력 필드와 버튼이 결합된 검색 폼, 블로그 카드 등

#### Organisms (유기체)

- Molecules와 Atoms를 결합한 더 복잡한 컴포넌트
- 예: 네비게이션 바, 블로그 포스트 목록, 댓글 섹션 등

#### Templates (템플릿)

- 페이지의 구조를 정의하는 컴포넌트
- 예: 블로그 포스트 레이아웃, 메인 페이지 레이아웃 등

#### UI

- 재사용 가능한 공통 UI 컴포넌트
- 예: 모달, 토스트 메시지, 로딩 스피너 등

## 기술 스택

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** [사용 중인 스타일링 방식]
- **Deployment:** [배포 플랫폼]

## 시작하기

1. 저장소 클론

```
bash
git clone [repository-url]
```

2. 의존성 설치

```
bash
npm install
```

3. 개발 서버 실행

```
bash
npm run dev
```

4. 브라우저에서 확인

```
http://localhost:3000
```

## 주요 기능

- 블로그 포스트 작성 및 관리

## 구성 파일

- `next.config.ts`: Next.js 설정 파일
- `tsconfig.json`: TypeScript 설정
- `eslint.config.mjs`: ESLint 설정
- `package.json`: 프로젝트 의존성 및 스크립트

## 라이선스
