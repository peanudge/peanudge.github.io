---
sidebar_position: 3
---

# SideBar Layout

사이드바가 있는 레이아웃을 구성하기

![SideBar Image](./OnlySideMenu.jpg)

```html
<div class="container">
  <div class="side"></div>
  <div class="content"></div>
</div>
```

```css
.container {
  display: flex;
  flex-direction: row;
}

.side {
  flex-shrink: 0;
  width: 300px;
}

.content {
  flex-grow: 1;
  min-width: 0;
}
```

## 주의할 점

- `min-width`를 `0`으로 처리하는 이유는 초기 값은 `auto` 이기 때문에 자식 요소의 최대 크기가 min-width로 지정된다.

- `flex-direction: row-reverse;`로 변경하면 우측 사이드 바로 쉽게 변경 가능
