# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive-design.spec.ts >> 반응형 디자인 - 다중 Viewport >> 글 상세 페이지 >> Tablet (768px - iPad)에서 콘텐츠 레이아웃 확인
- Location: e2e\responsive-design.spec.ts:118:11

# Error details

```
Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - alert [ref=e2]: 자바스크립트 강의 초안입니다. | 유주's Blog
  - generic [ref=e3]:
    - banner "사이트 헤더" [ref=e4]:
      - link "블로그 홈으로 이동" [ref=e5] [cursor=pointer]:
        - /url: /
        - img [ref=e7]
        - generic [ref=e11]: 유주's Blog
      - generic [ref=e13]:
        - img [ref=e14]
        - textbox "블로그 글 검색" [ref=e17]:
          - /placeholder: 글 검색...
      - link "관리자 로그인" [ref=e18] [cursor=pointer]:
        - /url: /admin/login
        - button "관리자 로그인" [ref=e19]: 로그인
      - button "다크/라이트 모드 전환" [ref=e20]:
        - img
    - main [ref=e21]:
      - article [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]:
            - heading "자바스크립트 강의 초안입니다." [level=1] [ref=e25]
            - generic [ref=e26]:
              - link "#javascript" [ref=e27] [cursor=pointer]:
                - /url: /tags/javascript
                - generic [ref=e28]: "#javascript"
              - link "#클로드 코드" [ref=e29] [cursor=pointer]:
                - /url: /tags/-
                - generic [ref=e30]: "#클로드 코드"
            - generic [ref=e31]:
              - generic [ref=e32]: "발행: 2026년 5월 2일"
              - generic [ref=e33]: "수정: 2026년 5월 2일"
          - paragraph [ref=e35]: 자바스크립트 강의 초안입니당
          - navigation [ref=e36]:
            - link "다음 글 → 웹 포트폴리오" [ref=e39] [cursor=pointer]:
              - /url: /posts/34eda59e-7d34-8077-b987-f8a0d7d92846
              - generic [ref=e40]: 다음 글 →
              - generic [ref=e41]: 웹 포트폴리오
          - link "← 목록으로 돌아가기" [ref=e43] [cursor=pointer]:
            - /url: /?slide=1
```