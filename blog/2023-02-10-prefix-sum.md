---
title: Prefix Sum
description: 알고리즘(GenomicRangeQuery) - 구간합
slug: prefix-sum
authors: jiho
tags: [algorithm, prefix-sum, GenomicRangeQuery]
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# 구간 합 Prefix Sum

항상 코딩테스트에서 자주 틀리는 유형인 구간 합을 이번에 한번 정리해보려합니다.

매번 만날 때마다 고생하고 힘들게 했던 Prefix를 머리 속에 각인시키기위해서 글로 정리해보려합니다.

- 구간 합이 뭔지?
- 구간 합을 응용한 사례들 확인
- 머리속에 표준화시킬 아이디어

# 구간 합이란?

우선,구간 합은 캐시효과(memoization)를 이용한 효율성 최적화 기법이라 생각하면 될듯합니다.

캐시 방법은 다양하지만 구간합은 특히, **무언가를 미리 합으로 누적시켜놓고** 나중에 빠른 연산을 위해 나중에 미리 계산한 내용을 활용해서 값을 얻어내는 방식입니다.

특정 위치 사이의 값을 빠르게 반복해서 얻어낼려면 이 알고리즘을 필수로 기억내놓는 것이 좋겠다.

구간내에 등장 여부, 구간의 합을 체크하는데 용이한 것 같다.

# 구간 합을 응요한 사례

https://app.codility.com/programmers/lessons/5-prefix_sums/genomic_range_query/

```javascript
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

const impactFactor = {
  A: 1,
  C: 2,
  G: 3,
  T: 4,
};

function solution(S, P, Q) {
  const answer = [];
  const prefixSums = {
    A: Array(S.length).fill(0),
    C: Array(S.length).fill(0),
    G: Array(S.length).fill(0),
    T: Array(S.length).fill(0),
  };

  for (let i = 0; i < S.length; i++) {
    const s = S[i];

    for (const letter of Object.keys(prefixSums)) {
      if (i === 0) {
        prefixSums[letter][i] = 0;
      } else {
        prefixSums[letter][i] = prefixSums[letter][i - 1];
      }

      if (letter === s) {
        prefixSums[letter][i] += 1;
      }
    }
  }

  for (let k = 0; k < P.length; k++) {
    const startIdx = P[k];
    const endIdx = Q[k];

    let minimum = Infinity;

    for (const letter of Object.keys(prefixSums)) {
      const startLetterCount =
        startIdx !== 0 ? prefixSums[letter][startIdx - 1] : 0;
      const endLetterCount = prefixSums[letter][endIdx];

      if (endLetterCount - startLetterCount > 0) {
        minimum = Math.min(minimum, impactFactor[letter]);
      }
    }

    answer.push(minimum);
  }
  return answer;
}
```
