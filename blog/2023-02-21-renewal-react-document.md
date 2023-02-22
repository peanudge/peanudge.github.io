---
title: ReactJS의 새로운 문서 받아들이기
description: ReactJS의 리뉴얼 문서는 왜 생겼을까?
slug: renewal-react-document
authors: jiho
tags: [react, renewal, document]
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# React JS Renewal Document?

최근 React JS의 공식문서가 리뉴얼되고 있다는 소식이 종종 들립니다.(beta.reactjs.org) 이전 문서에서도 불만은 없었던터라 왜 리뉴얼을 했을지 궁금했습니다. **리액트팀의 운영 기조(트렌드)**가 바뀌었을까? 아니면 과거 문서에 문제점이 있었을까?

<!--truncate-->

## What is this site?

그래서 리뉴얼되고 있는 공식 문서를 살펴보니 기존 문서와의 차이점은 아래와 같았습니다.

> All explanations are written using Hooks rather than classes.

`모든 설명들은 Class보다는 Hook을 사용해서 작성되었습니다.` 라는 내용을 보고 느낀점은 **확실히 리액트팀은 클래스의 사용을 줄이고 싶은 것 같습니다.** 이제는 확실히 Class 컴포넌트들을 Function 컴포넌트로 교체하는 걸 고려해봐야할 듯하네요.

- We’ve added interactive examples and visual diagrams.

시각적인 다이어그램들과 문서를 읽는 독자들에게 도움되는 interactive한 예제들을 추가했습니다. 확실히 리액트 학습에 도움이 많이 되는 것 같습니다.

- Guides include challenges (with solutions!) to check your understanding.

이해를 확인하기 위해 어려운 도전과제들과 그에 대한 해법들을 포함하고 있습니다. 개인적으로 채팅 예제들이 굉장히 많은 도움이 되었던 것 같습니다.

## Will this site replace the main site?

리액트팀은 기존에 존재하던 리액트 문서를 새로운문서로 교체할 계획입니다. 그리고 오래된 리액트 웹사이트는 subdomain에 archive할 계획이라고합니다.

### 리뉴얼 문서 읽어보고 리액트 활용 방향 파악하기

앞으로 리액트의 대략적인 방향성을 파악하기 위해서 문서를 읽어보고 정리해보려합니다. 기존에 몰랐던 내용들도 많이 담겨있어서 도움이 많이 될 것 같습니다. 가능하다면 아래 3가지 카테고리로 문서를 정리해서 남겨둘 계획입니다.

- Escape Hatch on ReactJS Document
  - ReactJS 의 Rendering 사이클을 벗어날 필요가 있을 때 해결방법
  - `useEffect` or `useRef` ...etc
- Managing State on ReactJS Document
  - Reconcilation(재조정)에 대한 이해
- (Youtube) The Documentary ReactJS
  - 리액트의 역사를 다큐로 잘 만들어놨길래 번역해서 정리해볼 계획입니다.
