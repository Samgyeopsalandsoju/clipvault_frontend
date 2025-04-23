# Clip Vault - 영상 클립 저장 및 관리 애플리케이션

## 1. 프로젝트 개요

Clip Vault는 사용자가 웹 상의 다양한 영상 클립(유튜브, 비메오 등)의 링크를 저장하고, 카테고리별로 분류하며, 필요시 다시 찾아볼 수 있도록 돕는 웹 애플리케이션입니다. 사용자 편의성을 높이기 위해 직관적인 UI와 반응형 디자인을 적용했으며, Next.js의 최신 기능을 활용하여 빠른 성능과 안정적인 서비스를 제공하는 것을 목표로 합니다.

**주요 기능:**

- 영상 클립 URL 저장 및 미리보기 정보 표시
- 클립 제목, 설명, 카테고리 편집
- 카테고리별 클립 분류 및 조회
- 클립 '포크(Fork)' 기능 (다른 사용자의 유용한 클립을 내 보관함으로 가져오기 - 구현 예정 또는 현재 기능)
- 다크 모드 지원

## 2. 기술 스택

이 프로젝트는 다음과 같은 기술 스택을 기반으로 개발되었습니다.

### 💻 Frontend

- **Framework:** [Next.js](https://nextjs.org/) (v15+, App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/) (v19+)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest), [Axios](https://axios-http.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/)

### 🎨 Styling

- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/) (with PostCSS)
- **UI Components:** 일부 [Material UI (MUI)](https://mui.com/) 컴포넌트 사용 (@emotion/react, @mui/material)
- **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Theme:** 다크 모드 지원 (next-themes)

### ⚙️ State Management

- **Atomic State:** [Jotai](https://jotai.org/)
- **Global State:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Local Component State:** React Hooks (`useState`, `useCallback`, etc.)

### 🚀 CI/CD & Deployment

- **CI/CD Platform:** [GitHub Actions](https://github.com/features/actions)
- **Deployment Service:** [AWS CodeDeploy](https://aws.amazon.com/codedeploy/)
- **Hosting/Storage:** [AWS S3](https://aws.amazon.com/s3/) (배포 패키지 저장)
- **Server Environment:** AWS EC2 (추정)
- **Process Manager:** [PM2](https://pm2.keymetrics.io/) (`ecosystem.config.js`)

### 🛠️ 기타 도구

- **Package Manager:** [pnpm](https://pnpm.io/)
- **Linting/Formatting:** [ESLint](https://eslint.org/) (Next.js ESlint config)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (v4)
- **Utilities:** `classnames`, `uuid`, `bcryptjs`, `jsonwebtoken`, `react-hot-toast`

## 3. 아키텍처 및 주요 특징

### Next.js App Router 활용

- **서버 컴포넌트 (Server Components):** 초기 페이지 로딩 성능 최적화를 위해 App Router의 서버 컴포넌트를 적극 활용합니다. 페이지 레벨(`page.tsx`)에서 필요한 초기 데이터를 `async/await`를 사용하여 서버에서 직접 가져오고, 이를 클라이언트 컴포넌트에 props로 전달합니다.

  ```tsx
  // 예시: src/app/(client)/home/page.tsx
  import { ClientHomeComponent } from '@/components/feature/home/ClientHomeComponent';
  import { getHomeClips, getForkedClips } from '@/services/homeService';

  const HomePage = async () => {
    const initialClips = await getHomeClips();
    const initialForks = await getForkedClips();

    return (
      <>
        {/* 정적 섹션 */}
        <ClientHomeComponent initialClips={initialClips} initialForks={initialForks} />
      </>
    );
  };
  export default HomePage;
  ```

- **클라이언트 컴포넌트 (Client Components):** 사용자 상호작용, 상태 관리 Hook(`useState`, `useEffect`), 브라우저 API 접근이 필요한 컴포넌트는 `'use client'` 지시어를 사용하여 클라이언트 컴포넌트로 정의합니다. 서버에서 받아온 초기 데이터를 기반으로 동적인 UI 업데이트 및 사용자 인터랙션을 처리합니다.

  ```tsx
  // 예시: src/components/feature/home/ClientHomeComponent.tsx
  'use client';
  import { useState, useCallback } from 'react';
  import { useForkQuery } from '@/hooks'; // 사용자 인터랙션 관련 Hook

  interface ClientHomeComponentProps {
    /* ... */
  }

  export const ClientHomeComponent = ({ initialClips, initialForks }: ClientHomeComponentProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false); // 모달 상태 등
    const { doFork } = useForkQuery(); // 클라이언트 측 데이터 변경 액션

    const handleFork = useCallback(
      async (clipId: string) => {
        /* ... */
      },
      [doFork]
    );

    // ... 렌더링 로직 ...
  };
  ```

- **라우트 핸들러 (API Routes):** `src/app/api/` 경로에 API 라우트를 정의하여 클라이언트 측에서 필요한 데이터 요청(CRUD)을 처리하거나 서버리스 함수와 유사한 백엔드 로직을 수행합니다.

### 데이터 Fetching 전략

- **초기 데이터:** 서버 컴포넌트에서 직접 서비스 함수를 호출하여 로드 (SSR 이점 극대화)
- **동적 데이터/변경:** 클라이언트 컴포넌트에서 TanStack Query, Axios 클라이언트를 사용하여 API 라우트 또는 외부 API 호출 (사용자 인터랙션 기반)
- **API Client:** Axios 인스턴스를 사용하여 API 요청을 관리하며, 서버 환경과 클라이언트 환경을 구분하여 적절한 Base URL을 사용하도록 설정되어 있습니다 (환경 변수 활용).

### 상태 관리

- **Jotai & Zustand:** 애플리케이션의 복잡성과 요구사항에 맞춰 원자적 상태(Jotai)와 전역 스토어(Zustand)를 조합하여 사용합니다. 이를 통해 상태 로직을 효과적으로 분리하고 컴포넌트 리렌더링을 최적화합니다.
- **React Query:** 서버 상태 관리 및 캐싱, 비동기 데이터 동기화에 React Query를 활용하여 데이터 무결성을 유지하고 불필요한 API 호출을 줄입니다.

### 자동화된 CI/CD 파이프라인

- `main` 브랜치에 코드가 푸시되면 **GitHub Actions** 워크플로우가 자동으로 트리거됩니다.
- 워크플로우는 다음 단계를 수행합니다:
  1.  코드 체크아웃 및 Node.js/pnpm 환경 설정
  2.  `.env.production` 파일 생성 (GitHub Secrets 사용)
  3.  의존성 설치 (`pnpm install`)
  4.  프로덕션 빌드 (`pnpm build`)
  5.  배포 패키지 생성 (빌드 결과물, 설정 파일 등 압축)
  6.  AWS 자격 증명 설정
  7.  배포 패키지를 **AWS S3** 버킷에 업로드
  8.  **AWS CodeDeploy** 배포 트리거
- CodeDeploy는 `appspec.yml` 설정에 따라 EC2 인스턴스에 새 버전의 애플리케이션을 배포하고, `scripts/` 내 쉘 스크립트를 실행하여 디렉토리 설정, 심볼릭 링크 변경, **PM2**를 이용한 서비스 재시작 등을 수행합니다.

### 스타일링 및 UI

- **Tailwind CSS:** 유틸리티 우선 접근 방식을 통해 빠르고 일관된 UI 개발을 지원합니다. `tailwind.config.js`에 커스텀 색상, 폰트 등을 정의하여 프로젝트 디자인 시스템을 구축했습니다.
- **다크 모드:** `next-themes` 라이브러리와 Tailwind CSS의 `darkMode: 'class'` 설정을 이용하여 라이트/다크 모드를 지원합니다.

## 4. 프로젝트 구조

```
.
├── .github/workflows/      # GitHub Actions 워크플로우 (CI/CD)
├── .next/                  # Next.js 빌드 결과물
├── node_modules/           # 의존성 모듈
├── public/                 # 정적 파일 (이미지, 폰트 등)
├── scripts/                # 배포 관련 쉘 스크립트
├── src/                    # 소스 코드 루트
│   ├── app/                # Next.js App Router (페이지, 레이아웃, API 라우트)
│   │   ├── (client)/       # 클라이언트 전용 라우트 그룹
│   │   ├── api/            # API 라우트 핸들러
│   │   └── ...             # 기타 라우트
│   ├── components/         # UI 컴포넌트 (공용, 기능별)
│   ├── constants/          # 상수 값
│   ├── hoc/                # 고차 컴포넌트
│   ├── hooks/              # 커스텀 React Hooks
│   ├── libs/               # 공통 라이브러리/유틸리티 (API 클라이언트, 토스트 등)
│   ├── providers/          # 전역 Context Provider 등
│   ├── services/           # API 호출 서비스 로직
│   ├── stores/             # 상태 관리 (Jotai, Zustand)
│   ├── styles/             # 전역 스타일, Tailwind CSS base/utilities
│   ├── types/              # TypeScript 타입 정의
│   └── utils/              # 범용 유틸리티 함수
├── .env                    # 로컬 환경 변수 (버전 관리 제외)
├── .gitignore              # Git 추적 제외 목록
├── appspec.yml             # AWS CodeDeploy 설정
├── ecosystem.config.js     # PM2 설정
├── eslint.config.mjs       # ESLint 설정
├── next.config.ts          # Next.js 설정
├── package.json            # 프로젝트 정보 및 의존성
├── pnpm-lock.yaml          # pnpm 잠금 파일
├── postcss.config.js       # PostCSS 설정
├── README.md               # 프로젝트 설명 (현재 파일)
├── tailwind.config.js      # Tailwind CSS 설정
└── tsconfig.json           # TypeScript 설정
```

## 5. 시작하기

### 요구사항

- Node.js (v20 이상 권장 - `volta` 설정 참고)
- pnpm (v9 권장)

### 로컬 환경 설정

1.  **저장소 복제:**

    ```bash
    git clone <repository-url>
    cd clip-vault
    ```

2.  **의존성 설치:**

    ```bash
    pnpm install
    ```

3.  **환경 변수 설정:**

    - 루트 디렉토리에 `.env` 파일을 생성합니다.
    - `.env.example` 파일이 있다면 해당 내용을 복사하여 필요한 값(API URL, NextAuth Secret 등)을 입력합니다. GitHub Actions 워크플로우의 `.env.production` 생성 부분을 참고하여 필요한 변수를 확인하세요.

4.  **개발 서버 실행:**
    ```bash
    pnpm dev
    ```
    브라우저에서 `http://localhost:3000` (또는 설정된 포트)으로 접속합니다.

### 빌드 및 프로덕션 실행

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 서버 시작
pnpm start
```

## 6. 배포

이 프로젝트는 GitHub Actions와 AWS CodeDeploy를 통해 자동 배포됩니다. `main` 브랜치에 변경 사항이 푸시되면 자동으로 빌드 및 배포 프로세스가 진행됩니다. 자세한 내용은 `.github/workflows/deploy.yml` 및 `appspec.yml` 파일을 참고하세요.
