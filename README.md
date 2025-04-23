# Clip Vault - 영상 클립 저장 및 관리 애플리케이션

## 1. 프로젝트 개요

Clip Vault는 사용자가 웹 상의 다양한 클립(맛집 지도 링크, 유용한 정보 사이트)의 링크를 저장하고, 카테고리별로 분류하며, 필요시 쉽게 찾아볼수 있는 웹 애플리케이션입니다. 사용자 편의성을 높이기 위해 직관적인 UI와 반응형 디자인을 적용했으며, Next.js의 최신 기능을 활용하였습니다!

또한 악성 링크 저장및 공유를 _google safe browsing_ api와 여러 URL 필터 로직을 구현하여 방지하고 있습니다! [clipvault](https://www.clipvault.com)을 들어가시고 로그인을 하면 해당 기능들을 사용해볼수 있습니다.

**주요 기능:**

- URL 저장 및 미리보기
- 클립 제목, 설명, 카테고리 편집
- 카테고리별 클립 분류 및 조회
- 클립 '포크(Fork)' 기능 (다른 사용자의 유용한 클립을 내 보관함으로 가져오기)
- 원하는 카테고리 공유 링크 생성 기능

## 2. 기술 스택

이 프로젝트는 다음과 같은 스택을 사용하였습니다!

### 💻 Frontend

- **Framework:** [Next.js](https://nextjs.org/) (v15+, App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest), [Axios](https://axios-http.com/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/)
- **Auth:** [next-auth](https://next-auth.js.org/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)

### 🎨 Styling

- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/) (with PostCSS)
- **UI Components:** 일부 [Material UI (MUI)](https://mui.com/) 컴포넌트 사용 (@emotion/react, @mui/material)

### 🚀 CI/CD & Deployment

- **CI/CD Platform:** [GitHub Actions](https://github.com/features/actions)
- **Deployment Service:** [AWS CodeDeploy](https://aws.amazon.com/codedeploy/)
- **Hosting/Storage:** [AWS S3](https://aws.amazon.com/s3/)
- **Server Environment:** AWS EC2
- **Process Manager:** [PM2](https://pm2.keymetrics.io/)

## 3. 아키텍처 및 주요 특징

### Next.js App Router 활용

- **서버 컴포넌트 (Server Components):** 초기 페이지 로딩 성능 최적화를 위해 App Router의 서버 컴포넌트를 적극 활용하였습니다. 페이지 레벨(`page.tsx`)에서 필요한 초기 데이터를 `async/await`를 사용하여 서버에서 직접 가져오고, 이를 클라이언트 컴포넌트에 props로 전달합니다.

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

### 데이터 Fetching 및 상태 관리 전략

- **초기 데이터 로딩 (Server Components):**

  - 페이지 최초 접근 시 필요한 핵심 데이터는 서버 컴포넌트(`async page.tsx`)에서 직접 서비스 계층(`@/services`) 함수를 호출하여 가져옵니다.
  - 이 방식은 서버에서 렌더링을 완료한 후 HTML을 클라이언트에 전달하므로, SSR의 최대한 장점을 살리려고 노력해보았습니다.

- **클라이언트 상호작용 기반 데이터 관리 (Client Components):**

  - 사용자의 액션(버튼 클릭, 폼 제출, 스크롤 등)에 따른 데이터 요청 및 변경은 클라이언트 컴포넌트 내에서 처리합니다.
  - **`Hook -> Service -> API Route` 흐름 예시 (클립 포크 기능):**

    - **1. Hook (`src/hooks/fork/useForkQuery.ts`):** 컴포넌트는 이 Hook을 호출하여 `doFork` 함수를 얻습니다. `useMutation`은 API 호출(포크 생성)을 처리하고, 특히 `onMutate` 옵션에서 낙관적 업데이트 로직을 실행합니다.

      ```typescript
      // src/hooks/fork/useForkQuery.ts
      import { useMutation, useQueryClient } from '@tanstack/react-query';
      import { postFork } from '@/services';
      import { IDoForkRequest, IClipResponse } from '@/types';

      export const useForkQuery = () => {
        const queryClient = useQueryClient();
        // ... (다른 로직 생략)

        const doForkMutation = useMutation({
          mutationFn: (data: IDoForkRequest) => {
            // ... (인증 확인 등 생략)
            return postFork(data); // 2. Service 함수 호출
          },
          // --- 낙관적 업데이트 시작 ---
          onMutate: async ({ clipId }) => {
            // 현재 쿼리 캐시를 즉시 업데이트 (서버 응답 전)
            await queryClient.cancelQueries({ queryKey: ['homeClip'] }); // 진행중인 refetch 취소
            const previousHomeClip = queryClient.getQueryData(['homeClip']); // 이전 상태 저장

            queryClient.setQueryData(['homeClip'], (oldList: IClipResponse[] = []) =>
              oldList.map((clip) =>
                clip.id === clipId
                  ? { ...clip, forkedCount: clip.forkedCount + 1, isForked: true } // UI 즉시 업데이트
                  : clip
              )
            );
            // (다른 관련 쿼리 캐시 업데이트 로직...)
            return { previousHomeClip }; // 롤백을 위한 컨텍스트 반환
          },
          onError: (err, variables, context) => {
            // 에러 발생 시 onMutate에서 저장한 이전 상태로 롤백
            if (context?.previousHomeClip) {
              queryClient.setQueryData(['homeClip'], context.previousHomeClip);
            }
            // (에러 처리 로직...)
          },
          onSettled: () => {
            // 성공/실패 여부와 관계없이 최신 상태 동기화를 위해 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['homeClip'] });
            // (다른 관련 쿼리 무효화...)
          },
          // --- 낙관적 업데이트 끝 ---
        });

        return {
          doFork: doForkMutation.mutateAsync,
          // ... (다른 반환값 생략)
        };
      };
      ```

    - **2. Service (`src/services/forkService.ts`):** Hook 내부에서 호출되며, 실제 API 엔드포인트(`/api/fork/post`)로 요청을 보냅니다.

      ```typescript
      // src/services/forkService.ts
      import { api } from '@/libs/api';
      import { APIResult, IDoForkRequest } from '@/types';

      export const postFork = async (data: IDoForkRequest) => {
        // 3. API Route 호출
        const response = await api.post<APIResult<string>>('/fork/post', data);
        return response.data;
      };
      ```

    - **3. API Route (`src/app/api/fork/post/route.ts`):** 클라이언트의 요청을 받아 실제 백엔드 API(`/v1/fork/create`)와 통신하고 결과를 반환합니다.

      ```typescript
      // src/app/api/fork/post/route.ts
      import { privateAPI } from '@/libs/api';
      import { APIResult, IDoForkRequest } from '@/types';
      import { NextResponse } from 'next/server';
      import type { NextRequest } from 'next/server';

      export async function POST(request: NextRequest) {
        try {
          const body: IDoForkRequest = await request.json();
          // (입력값 검증 로직 생략)

          // 실제 백엔드 API와 통신
          const { status, data } = await privateAPI.post<APIResult<string>>('/v1/fork/create', body);

          // (결과 처리 로직 생략)
          return NextResponse.json({ status: data.status, body: data.body });
        } catch (error) {
          // (에러 처리 로직 생략)
          return NextResponse.json({ status: false, body: '' }, { status: 500 });
        }
      }
      ```

  - **서버 상태 관리 (TanStack Query):**
    - 클라이언트 측의 서버 데이터 상태는 TanStack Query를 통해 관리합니다.
  - **낙관적 업데이트 (Optimistic Updates):**
    - 위의 `useForkQuery` Hook 예시의 `onMutate`, `onError`, `onSettled` 부분을 통해 낙관적 업데이트 구현 방식을 확인할 수 있습니다. 사용자가 '포크' 버튼을 클릭하는 즉시 UI가 변경되어 빠른 피드백을 제공하며, 네트워크 지연이나 서버 처리 시간으로 인한 대기 시간을 최소화해보았습니다.

- **클라이언트 상태 관리 (Zustand):**
  - 서버 데이터와 무관한 순수 클라이언트 상태(예: UI 모드, 모달 열림/닫힘 등 전역적으로 필요한 상태)는 Zustand를 사용하여 간결하고 효율적으로 관리합니다.

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

[clipvault](www.clipvault.info)에 접속하여 회원가입을 진행하면 해당 기능들을 전부 사용할수 있습니다.
