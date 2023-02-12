---
title: 블로그 리뷰 기능 추가하기(using Utterances)
description: how to add review feature about blog
slug: utterances
authors: jiho
tags: [utterances, review, blog]
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Utterances를 이용해서 깃 이슈로 피드백 받아보기

블로그에 글을 자주 쓰고 싶지만 글 주제 선택에 너무 신중한것 같습니다. 조금 더 가볍게 쓰고 피드백도 받아보고 싶어서 블로그 글에 대한 댓글을 utterance로 받아보려합니다.

기술 블로그의 독자는 대부분 깃허브 계정이 있다는 가정하에 연동을 준비하고 기록해두도록 해보겠습니다.

글쓰기 연습겸 이런 가벼운 주제도 한번 남겨보겠습니다.

<!--truncate-->

# Utterances 란?

바로 연동 방법을 찾아보기 전에 Utterances를 한번 이해해보면 더 잘 쓸 수 있을 것 같아서 가볍게 해당 플러그인(?)에 대해 알아봅시다.

## Utterances 소개

> 🏠 공식 홈페이지
> https://utteranc.es/

`A lightweight comments widget built on GitHub issues`

위에서 플러그인이라고 말했는데 사실 위젯이 맞는 것 같습니다. 댓글을 제공해주는 widget 이니 명칭을 수정해야겠네요.

`for blog comments, wiki pages and more!`

해당 위젯의 목적은 블로깅이나 위키 페이지 등등에 사용하라고 정확한 사용처를 밝혀두니 적절한 도구인 것 같네요.

```
Open source. 🙌
No tracking, no ads, always free. 📡🚫
No lock-in. All data stored in GitHub issues. 🔓
Styled with Primer, the css toolkit that powers GitHub. 💅
Dark theme. 🌘
Lightweight. Vanilla TypeScript. No font downloads, JavaScript frameworks or polyfills for evergreen browsers. 🐦🌲
```

소개란에 내용들이 적절하게 위젯을 잘 소개하는 것 같습니다. 오픈소스이면서 광고도 붙지않고 항상 공짜라고 밝혀서 마음놓고 사용해도 될 것 같습니다. 그리고 댓글들은 git issue에 모두 저장되니 의존성이 없어서 더 가볍게 사용할 수 있을 것 같습니다.

👀 _추가로 이것을 활용해서 특별한 집계도 할 수 있을가하는 생각도 드네요._

## ⛓ How its work (동작 방식)

가끔 이런 위젯이나 도구를 발견할 때 동작원리를 이해하면 다른 도구를 개발할 때 많은 도움이 되었던 사례들이 종종 있습니다.

몰랐던 지식도 습득할 수도 있으니 간단히 Urtterances의 동작원리도 정리해보겠습니다.

1. Urttrances 위젯이 특정 페이지에 로드될 경우, [Github issue search API](https://docs.github.com/ko/rest/search?apiVersion=2022-11-28#search-issues)를 이용해서 `url`, `pathname`, `title`를 기반으로 관련된 issue를 찾게됩니다.
2. 만약, 여기서 페이지에 대한 Git Issue를 찾지 못하더라도 문제가 되지않습니다. [`utterances-bot`](https://github.com/utterances-bot)은 자동으로 특정 누군가 처음으로 댓글을 작성했을 때 페이지의 새로운 git issue 생성합니다.

그리고 댓글 작성자들은 위젯을 통해 댓글을 작성하기위해서는 uterrances app에 권한을 할당해줘야합니다. 이 과정은 Github OAuth Flow를 따라 진행하게 됩니다. (직접 issue를 남기는게 아니라 utterances 봇을 통해 작업을 위임하는 것이니 당연한 작업이죠. 하지만 다소 귀찮게도 느껴집니다. _작성 과정에서 이탈하는 작성자들도 있을 것 같습니다._ 😟)

대안책으로 인증없이 git issue에 직접 댓글을 남길 수도 있습니다.

대략적인 동작방식은 알았으니 설정방법을 살펴보겠습니다.

## 🛠 Configuration

### 블로그 Repository에 Utterances 앱 설치

🚧 Utterances가 정상적으로 동작하기위해서는 댓글이 issue로 등록될 Repository에 몇가지 확인 및 설정이 필요합니다.

1. Repository 는 **public으로 공개되어 있어야** 독자들이 issues에 있는 댓글들을 가져와서 확인할 수 있습니다.

2. [utterances github app](https://github.com/apps/utterances) 이 Repository에 설치되어 있어야합니다.

설치가 되어 있지 않으면 댓글을 위젯을 통해 작성할 수 없습니다.

utterances 앱을 repository에 설치는 https://github.com/apps/utterances 에서 `Configure` 버튼을 눌러 Repository에 설치를 진행할 수 있습니다.

권한이 주어졌다면 repository의 Settings > Integrations > GitHub apps 에서 Utterances 앱을 확인할 수 있습니다.

3. 해당 repository가 fork된 repository라면 `settings` 탭을 통해 `issues` 기능을 활성화 시켜주세요.

### Widget Script 생성

위 설정들이 잘 수행되었다면 https://utteranc.es/ 에 있는 form을 통해 `script` 코드를 생성해서 웹페이지에 등록해봅시다.

Repository의 이름을 `peanut-lover/peanut-lover.github.io`로 입력하고

Blog Post를 Issue와 어떻게 Mapping 시킬지를 정하면됩니다.

저는 blog pathname이 자주 바뀔 것 같지않아서 `Issue title contains page pathname`를 이용해서 매핑을 하도록하겠습니다.

이렇게 입력을 하게되면 `Enable Utterances` 란에 아래와 같이 즉시 사용할 수 있는 script태그가 생성됩니다.

```html
<script
  src="https://utteranc.es/client.js"
  repo="peanut-lover / peanut-lover.github.io"
  issue-term="pathname"
  theme="github-light"
  crossorigin="anonymous"
  async
></script>
```

# Uttrances를 Docusaurus 프레임워크에 적용하기

위와 같은 결과를 가지고 docusaurus 블로그에 적용하려니 어떻게 할지 감이 안잡혀서 우선 공식문서를 뒤져봤습니다.

블로그 글은 Markdown 형태로 컨텐츠만 사용해왔던터라 블로그의 Layout를 어떻게 커스터마이징해야할지 몰랐습니다. 공식문서에는 Layout Custom라는 키워드로 탐색을 해보니 `Swizzling` 이라는 항목이 있었고 내용을 확인해봤습니다.

> This section is similar to Styling and Layout, but this time, we will write actual React code instead of playing with stylesheets. We will talk about a central concept in Docusaurus: swizzling, which allows deeper site customizations.

딱 저희에게 필요한 내용이죠. React Code로 커스터마이징을 제공하는 방법이라고합니다.

> TMI: Swizzling이라고 불리는 이유?
> Objective-C and Swift-U 에서 넘어온 단어라고 합니다. 기존 메소드의 구현체를 변환시키는 작업을 method swizzling이라고 합니다.
> Docusaurus에서는 component swizzling은 built-in 제공하는 컴포넌트를 대체하는 컴포넌트를 제공하는 것을 의미합니다.

마치 CRA의 eject 개념과 유사한 개념인 듯합니다. 그리고 docusarus도 특별한 CLI를 제공합니다.

```bash
$ yarn swizzle
```

Swizzle 과정은 아래와같이 처리됩니다. (Swizzling 자체에 대한 설명은 공식문서에서 잘 설명이 되있으니 링크로 대체합니다!)

## BlogPostPaginator 컴포넌트를 `swizzle`해서 Utterance 위젯 추가

`yarn swizzle`를 이용하면 아래와 같은 CLI 과정을 거쳐 docusaurus의 built-in 컴포넌트를 wrapping하는 컴포넌트(`src/theme/BlogPostPaginator/index.js`)를 자동 생성해줍니다.

> 🚧 eject 방식이 아닌 wrapper 를 생성하도록 유의해주세요~

[![asciicast](https://asciinema.org/a/DqcP8Le024hrJ2zy7de3br8fN.svg)](https://asciinema.org/a/DqcP8Le024hrJ2zy7de3br8fN)

자! 이제 위에서 생성했던 utterances `<script/>`를 리액트 컴포넌트로 사용할 수 있도록 재사용 컴포넌트(`src/components/Uttrances.tsx`)를 생성해주겠습니다.

```javascript
import React from "react";

// NOTE: The following script is auto-generated by https://utteranc.es/
//  <script
//    src="https://utteranc.es/client.js"
//    repo="peanut-lover/peanut-lover.github.io"
//    issue-term="pathname"
//    theme="github-light"
//    crossorigin="anonymous"
//    async
//  ></script>;

export default React.memo(() => (
  <section
    ref={(elem) => {
      if (!elem) {
        return;
      }
      const scriptElement = document.createElement("script");
      scriptElement.src = "https://utteranc.es/client.js";
      scriptElement.async = true;
      scriptElement.setAttribute("repo", "peanut-lover/peanut-lover.github.io");
      scriptElement.setAttribute("issue-term", "pathname");
      scriptElement.setAttribute("theme", "github-light");
      scriptElement.crossOrigin = "anonymous";
      elem.appendChild(scriptElement);
    }}
  />
));
```

이 컴포넌트를 아래와 같이 `src/theme/BlogPostPaginator/index.js`에 적용하면 끝입니다!

```javascript
import React from "react";
import BlogPostPaginator from "@theme-original/BlogPostPaginator";
import Uttrances from "@site/src/components/Uttrances";

export default function BlogPostPaginatorWrapper(props) {
  return (
    <>
      <BlogPostPaginator {...props} />
      <div style={{ marginTop: 20 }}>
        <Uttrances />
      </div>
    </>
  );
}
```
