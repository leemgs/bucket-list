# 🌟 내 인생의 버킷리스트 300

바쁜 일상 속에서 놓치기 쉬운 **가족, 건강, 자연, 여행, 배움, 기록, 나눔과 휴식** —
직접 해보고, 함께 웃고, 기억으로 남길 작은 행복 300가지를 관리하는 개인 홈페이지입니다.

**▶ 홈페이지: <https://leemgs.github.io/bucket-list/>**

- 대시보드: <https://leemgs.github.io/bucket-list/?view=dashboard>
- 버킷리스트 목록: <https://leemgs.github.io/bucket-list/?view=list>
- English dashboard: <https://leemgs.github.io/bucket-list/?view=dashboard&lang=en>

## ✨ 주요 기능

| 기능 | 설명 |
|---|---|
| ✅ 완료 관리 | 체크 한 번으로 완료 처리, 완료일 자동 기록 + 소감 메모 |
| ➕ 추가 / ✏️ 수정 / 🗑️ 삭제 | 홈페이지에서 바로 버킷 항목을 관리 |
| 📊 대시보드 | 전체 달성률 게이지, 분야별 진행률 바 |
| 🔍 탐색 | 15개 분야 필터 · 검색 · 전체/도전 중/완료 상태 필터 |
| ☁️ GitHub 자동 저장 | 변경 사항을 이 저장소의 `docs/data.json`에 자동 커밋 |
| 💾 백업 | JSON 내보내기/가져오기, 초기 300개 목록으로 되돌리기 (초기화는 GitHub 연동 후에만 가능) |

15개 분야: 가족과 사랑 ❤️ · 농촌과 자연 🌾 · 여행과 세계 ✈️ · 건강과 몸 💪 · 연구와 창작 🔬 ·
나눔과 사회 🤝 · 배움과 도전 📚 · 기록과 추억 📷 · 휴식과 일상 행복 ☕ · 은퇴와 인생 완성 🌅 ·
사람과 관계 👥 · 소소한 모험 🧭 · 집과 농촌 프로젝트 🏡 · 문화와 창작 🎨 · 마음과 유산 🕊️

## ☁️ GitHub 연동 설정 (변경 사항을 저장소에 반영하기)

이 홈페이지는 서버 없이 GitHub Pages에서 동작하는 정적 사이트입니다.
홈페이지에서 한 변경(완료 체크·추가·수정·삭제)을 저장소에 반영하려면
**Personal Access Token(PAT)** 을 한 번만 등록하면 됩니다.

1. **토큰 만들기** — [GitHub → Settings → Developer settings → Fine-grained tokens → Generate new token](https://github.com/settings/personal-access-tokens/new)
   - **Repository access**: `Only select repositories` → `leemgs/bucket-list` 만 선택
   - **Permissions**: `Contents` → **Read and write** 만 허용 (다른 권한 불필요)
   - 만료 기간은 원하는 대로 설정 (만료되면 새 토큰으로 교체)
2. **홈페이지에서 등록** — <https://leemgs.github.io/bucket-list/> 접속 →
   상단 **⚙ GitHub 연동** 버튼 → 토큰 붙여넣기 → **🔌 연결 테스트**로
   토큰 유효성·저장소 접근·쓰기 권한을 확인 → **저장·연결**
3. 이후 모든 변경 사항이 약 2초 뒤 자동으로 `docs/data.json`에 커밋됩니다.
   상단의 상태 표시(✅ GitHub에 저장됨)로 확인할 수 있습니다.

> 🔒 **보안 참고**: 토큰은 외부 서버로 전송되지 않으며, 사용 중인 **브라우저의
> localStorage에만** 저장되어 GitHub API 호출에만 사용됩니다. 공용 PC에서는
> 사용 후 "연동 해제"를 눌러 토큰을 지우세요. 토큰이 노출된 경우 GitHub에서
> 즉시 폐기(revoke)하면 됩니다.

토큰을 등록하지 않으면 변경 사항은 현재 브라우저에만 저장됩니다.
이 경우 **내보내기(백업)** 기능으로 JSON 파일을 내려받아 보관하세요.

## 🔄 데이터 동작 방식

- **원본 데이터**: `docs/data.json` (저장소의 단일 진실 원천, 홈페이지가 여기에 커밋)
- **작업 사본**: 브라우저 localStorage (모든 변경이 즉시 저장됨)
- 페이지를 열면 원격(`data.json`)과 로컬 중 **더 최신인 쪽**을 자동으로 사용하고,
  로컬이 더 최신이면 GitHub에 자동 반영합니다.
- 여러 기기에서 사용할 때는 각 기기에서 GitHub 연동을 설정하면 데이터가 저장소를 통해 공유됩니다.

## 📁 파일 구성

```
bucket-list/
├── README.md                      # 이 문서
├── my_life_bucket_list_300.html   # 최초 버킷리스트 원본 (300개, 보관용)
└── docs/                          # GitHub Pages 사이트 루트
    ├── index.html                 # 버킷리스트 관리 홈페이지 (단일 파일 앱)
    ├── data.json                  # 현재 버킷리스트 데이터 (홈페이지가 자동 커밋)
    └── data.js                    # 초기 300개 시드 데이터 (초기화 기능용)
```

## 🚀 GitHub Pages 설정

저장소 **Settings → Pages** 에서:

- **Source**: `Deploy from a branch`
- **Branch**: `main` / 폴더 `/docs`

설정 후 몇 분 안에 <https://leemgs.github.io/bucket-list/> 로 접속할 수 있습니다.

## 🛠️ 로컬에서 실행

```bash
git clone https://github.com/leemgs/bucket-list.git
cd bucket-list/docs
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

---

> "완료하면 체크하고, 완료일과 짧은 소감을 남깁니다.
> 매년 생일이나 연초에 목록을 다시 읽고 삶의 변화에 맞게 수정합니다." 🌟
