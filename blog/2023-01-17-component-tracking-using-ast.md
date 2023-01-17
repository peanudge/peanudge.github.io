---
title: AST 분석을 활용해서 컴포넌트 추적해보기
description: Webpack Plugin을 활용해서 Component 사용 내역 확인하는 프로젝트
slug: component-tracking-with-ast
authors: jiho
tags: [ast, webpack, design-system, react]
# Display h2 to h5 headings
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# AST 분석을 활용해서 컴포넌트 추적해보기

2022 패스트 캠퍼스에서 진행하는 inner circle 디자인시스템(김민태 멘토님) 스터디에서 진행했던 내용을 기반으로 작성한 글입니다.

프로젝트를 진행하기 앞서 주제를 정하기까지 한달 정도를 고민했었습니다.

왜냐하면 디자인 시스템의 정의 자체가 조직, 프로젝트마다 달라질만큼 추상적인 주제이기에 팀원들간의 합의점을 찾는 것이 어려웠습니다.

그래서 다른 조직이 사용하는 디자인 시스템 자체를 집중하기보다는 현재 개발자와 디자이너가 협업하는데에 있어서 방해가 되는 문제에 대한 문제정의를 해보고 그 문제를 해결하는 도구 혹은 워크플로우를 한번 개선해보는 방향으로 고민을 시작해보았습니다.

<!--truncate-->

개발자, 디자이너 지인들과 인터뷰를 통해 디자인 시스템에서의 여러 문제들을 파악해볼 수 있었습니다.

> 개발자와 디자이너가 바라보는 디자인 시스템의 시각은 굉장히 달랐고 디자이너가 룩앤필 일치시키기 위해서는 개발자들과의 커뮤니케이션 비용이 많이 필요함.

사실 그 외에 원활한 디자인 시스템을 통한 워크플로우를 방해하는 다양한 요소가 있었지만 우선순위를 정할 만큼 많은 정보를 수집하기가 어려워서 **개인적인** 경험에서 가장 크게 개선하고 싶은 요소를 해결해보고 싶어서 주관을 많이 반영해보았습니다. (일이 아니라 사이드 프로젝트이기에 😉)

서두가 길었고 이번 PoC(Proof Of Concept) 를 통해 해결하고 싶은 문제를 정의해보면 아래와 같습니다.

# 문제정의

✏️ "디자인와 개발자가 컴포넌트를 **언제 어디서 어떻게** 사용하는지 추적하는 것은 쉽지 않다. 특히, 문서화가 되어있지않다면 디자이너가 혼자 컴포넌트가 사용되는 화면을 찾는 것 자체가 불가능할 수도 있다."

컴포넌트를 왜 찾아야할까요? 일관성(look and feel)을 유지하기 위해서라고 말할 수 있겠네요. 이런 측면에서 보면 컴폰넌트를 쉽게 못 찾는 것이 컴포넌트 일관성을 유지하기가 어렵다의 원인이 될 수 있을 것 같습니다.

결국, **컴포넌트 일관성을 유지하기 어렵다**가 진짜 문제이고 그 문제의 원인 중에 하나인 컴포넌트를 쉽게 찾을 수 없다는 것을 해결하기 위해 저희는 이번 PoC를 진행한다고 볼 수 있겠습니다.

> 👀 왜 일관성이 유지되어야하느냐?라고 또 한번 생각해볼 수 있지만 널리 알려진 디자인 시스템의 장점중 하나이기에 충분히 증명되었기에 이 정도 문제정의라면 충분할 것 같습니다.

# 해결 방안

문제 정의와 그 문제의 원인을 확인했으니 이번에는 그 원인을 해결하는 방안에 대해 생각해보겠습니다.

아주 감사하게도 [배시시 디자인시스템 구성을 소개하는 유튜브 영상](https://www.youtube.com/watch?v=6EAnAaXnOEQ&t=910s)이 공개되어있었습니다. 정말 좋은 내용인데 조회 수가 적은게 의아했습니다. 아마 내용 자체가 어려웠기에 그럴 수도 있겠죠.

아무튼 위 배시시 영상의 내용 중 프러덕트별로 어디서 컴포넌트가 사용되는지 웹팩 플러그인으로 추적하고 종합해서 보여주는 작업을 진행한 것을 보고 아이디어를 얻어서 비슷한 주제로 PoC 프로젝트를 진행하기로 했습니다.

컴포넌트가 어디서 어떻게 사용되는지는 웹팩의 AST 분석과정과 Module Resolving 과정에 개입해서 프로젝트내에 컴포넌트 사용 정보를 추출해보기로 결정했습니다.

그리고 AST 분석하는 방법은 명확한 과정이나 자료가 충분치 않아서 오픈소스나 혹은 under the hood 수준의 블로깅을 찾아서 시행착오를 많이 해봐야했습니다.

# Webpack Build 시 특정 React Component 추적하기

:::caution

실제 잘 동작하는 코드를 보고싶다면 해당 프로젝트 코드를 확인해주세요.

https://github.com/InnerCircleA/mono-repo/tree/main/packages/component-tracking-plugin

:::

어떤 작업들을 해야할 지 정리해보면 크게 3가지 정도의 작업으로 나눌 수 있습니다.

- 자바스크립트 모듈을 빌드시 리액트 컴포넌트 사용정보를 수집할 방법 구현
  - AST 분석 단계에서 리액트 Element 생성 함수 호출을 분석
- 컴포넌트가 **어떤 화면에서** 컴포넌트가 사용되었는지에 대한 정보 수집
- 위 정보를 종합해서 JSON 결과로 출력

사실 위 PoC를 수행 후 수집된 output를 어떻게 처리할지는 다양할 수 있으나 이번 관심사가 아니기에 위 세 가지 단계까지를 목표로 정했습니다.

## 커스텀 Webpack Plugin 생성

웹팩 플러그인은 webpack hook을 이용해서 번들링 과정에 개입을 할 수 있습니다. 커스텀 플러그인은 아래와 같이 정의할 수 있습니다.

> https://webpack.js.org/contribute/writing-a-plugin/#root

```javascript
class MyExampleWebpackPlugin {
  apply(compiler) {
    // 여기서 훅을 이용해서 정보 수집
  }
}
```

사실 여기서 중요한 것은 웹팩에서 제공하는 훅들이 어떤 것들이 있는지 알고 어떻게 찾아서 활용하느냐를 아는 것이 중요합니다. 하지만 [공식문서](https://webpack.js.org/api/compiler-hooks/)만 봐도 제공되는 훅들의 양에 압도되기도합니다. 학습을 위해서 플러그인에서 훅들을 하나씩 호출해보면서 과정을 확인하는 방향으로 접근하거나 [Webpack 오픈소스](https://github.com/webpack/webpack)에서 훅들이 어디서 호출되는지 찾아볼 수 있습니다.

:::tip

기초 지식없이 웹팩 플러그인 제작을 시작하기에는 학습곡선이 너무 가파르니 전체적인 그림을 머리속에 그리는 데에 도움이 많이 되었던 블로그 글을 추가로 공유하겠습니다.

> https://indepth.dev/posts/1482/an-in-depth-perspective-on-webpacks-bundling-process

위 블로그에서는 웹팩이 어떤 과정을 거쳐서 번들링된 결과물을 만들어 내는지를 다이어그램과 간단한 예시코드를 통해 잘 설명해주고 있습니다. 웹프론트 개발자라면 한번 읽어보면 많은 도움이 될 것 같습니다.

위 글을 읽어보면 entry file(진입점, 주로 index.js)을 시작으로 어떻게 dependency graph를 생성하고 처리하는지 큰 그림을 그려볼 수 있습니다.

:::

## AST 분석 단계에서 `_jsx()` 호출 확인하기

자! 이제 웹팩 번들링 과정 중 특정 모듈의 AST 분석 중 각 단계를 hooking할 수 있는 몇가지 훅을 소개하고 그 훅을 이용해서 무엇을 얻을 수 있을지 한번 알아보겠습니다.

```javascript
class ComponentTrackingPlugin {
  apply(complier) {
    compiler.hooks.normalModuleFactory.tap(className, (factory) => {
      factory.hooks.parser
        .for("javascript/auto")
        .tap(className, (parser, options) => {
          // TODO: Use Parsing Hooks
        });
    });
  }
}
```

위와 같이 `factory.hooks.parser` 내에서 모듈(하나의 자바스크립트 파일)내에서 JS Syntx 요소들을에 접근할 수 있는 훅들이 있습니다.

> 🚧 실제 트랜스파일링된 자바스크립트 코드에서 ReactElement 를 생성하는 코드들을 탐지할 방법은 어떤 babel plugin으로 변형되었으냐 등등에 따라 다양할 수 있어서 case by case를 모두 해결해줄 코드를 작성하는 것은 무리일 수 있습니다.
>
> 그래서 대표적인 boilerplate인 `CRA(create-react-app)`, `next-js` 의 기본 빌드 세팅을 대상으로 고정으로 정해두고 플러그인을 개발하는 것이 이상적일 것 같습니다. 이렇게 한다해도 다양한 예외케이스가 생길 수 있습니다.

[React 17 이상 부터는 적용되는 JSX Transform 업데이트](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)를 적극이용해보도록 하겠습니다.

```javascript
// Inserted by a compiler (don't import it yourself!)
import { jsx as _jsx } from "react/jsx-runtime";

function App() {
  return _jsx("h1", { children: "Hello world" });
}
```

프로젝트에서 항상 위와 같은 형태로 React Component를 사용한다고 가정한다면 저희는 AST 분석에서 `_jsx`가 호출되었는지를 찾아내면 컴포넌트 정보를 얻어낼 수 있습니다.

본격적으로 AST Tree에 접근해보겠습니다.

`parser.hooks.finish` 훅을 이용해서 모듈의 AST Tree를 탑색하면서 `_jsx`가 호출된 곳들을 수집하는 코드를 작성해봅시다.

```javascript
const estraverse = require('estraverse');

const checkJSXCallExpression = (expression) =>{
	return expression.type === 'CallExpression'
		&& expression.callee?.type === 'Identifier'
		&& (expression.callee.name === '_jsx' || expression.callee.name === '_jsxDEV'); // _jsxDev 는 webpack development mode에서 처리됨
}

class ComponentTrackingPlugin {
	constructor() {
		this.componentInfoMap = new Map();
	}
	 apply(complier) {
		 compiler.hooks.normalModuleFactory.tap(className, (factory) => {
			factory.hooks.parser
				.for('javascript/auto')
				.tap(className, (parser, options) => {
				    parser.hooks.finish.tap(className, (ast) => {
						const currentNormalModule = parser.state.module; // Module Data
					    const componentNames = [];
						estraverse.traverse(ast, {
							enter: function (node, parent) {
								if(checkJSXCallExpression(node)) {
									const jsxCallExpression = node;
									const args = jsxCallExpression.arguments;
									const elementType = args[0];
									if (elementType.type !== 'Identifier') return;
									componentNames.push(elementType.name);
								}
							}
						});
						this.componentInfoMap.set(currentNormalModule, componentNames);
					}
				});
			});
	 }
}
```

위 코드는 단순하게 `_jsx(Button, {}, [])` 라는 표현이 있을 때 `Button` 를 수집하게 됩니다. 이런 식으로 리액트 컴포넌트 이름을 수집할 수 있습니다. 아주 간단히 AST 처리방식을 소개한 것이고 이것 외에도 많은 예외처리를 해줘야할 것입니다. [ast explorer 툴](https://astexplorer.net) 를 이용해서 실제 코드가 어떻게 AST 트리로 변형되는지 이해하고 처리해주는 것이 좋습니다.

그 외 컴포넌트의 이름 뿐만아니라 props 정보, 컴포넌트가 사용된 페이지를 수집하고 싶다면 아래 프로젝트를 참조해주세요.

> https://github.com/InnerCircleA/mono-repo/tree/main/packages/component-tracking-plugin

위 작업을 바탕으로 진행하다보면 모듈(소스파일 하나) 마다 코드를 통해 얻을 수 있는 정보들이 있다. 다만, 자바스크립트자체가 머신 readable하지않아 코드작성에 강한 규칙이 적용되어있어야 유의미한 정보를 얻어낼 수 있습니다.

그리고 여기까지 작업을 했을 때 각 모듈마다 컴포넌트 사용여부를 **약하게 추측**할 수 있습니다. **약하게 추측**한다고 표현한 이유는 모듈안에 `<Component/>` 라는 표현이 있다는 것만으로 컴포넌트 사용됐다고 표현할 수 없을 수도 있기 때문입니다.

> 🧐 자바스크립트 본연의 머신리더블하지않은 특성을 극복하기 위해서는 타입스크립트의 도움이 필요하지않을까 생각이듭니다.
> 추후 타입스크립트 AST 분석을 한번 시도해볼 예정입니다.

## Module Graph 이용해서 컴포넌트를 사용하는 페이지 찾아내기

위 작업까지 하게되면 Module과 사용되는 컴포넌트들의 정보를 1:1로 맵핑시킬 수 있지만 이런 정보가 크게 의미가 있을까요?

하나의 프로젝트에 **ConfirmButton은 N개 사용, CancelButtom은 M개 사용** 이런 정보가 디자이너, 개발자에게 보여진다해서 도움이 될 것 같진않습니다. 대신 어떤 페이지에서 어떤 컴포넌트가 사용되었다와 같은 정보를 제공할 수 있다면 적어도 컴포넌트가 사용된 프로젝트를 찾는 시간이 단축되는 것과 같은 도움이 될 것으로 보입니다.

그럼 우선, 어떤 모듈이 페이지 모듈일지 판단할 방법은 생각해보겠습니다.
앞서 말하면 자바스크립트 AST를 분석하는 단계에서는 모듈이 페이지 컴포넌트인지를 구분하는 것은 불가능합니다. 저희는 사람이기에 많은 맥락상에서 이름과 UI 특성들을 보고 판단하기에 가능하지만 기계는 쉽게 판단할 수 없습니다.

그래서 고안해낸 방법은 **특별한 표식인 Anotation**을 사용하는 것입니다. 예를들면 저는 `page()`라는 함수가 모듈의 가장 바깥 scope에 호출되었을 때, 해당 모듈은 페이지 모듈이라고 판단하도록 규칙을 정할 수 있습니다.

위 방법을 이용하면 AST 분석단계에서 Page로 구분되는 모듈과 페이지 정보를 따로 모아둘 수 있습니다.

```javascript

const checkPageModuleFromStatement = (statement) => {
	return statement.type === "ExpressionStatement"
			&& statement.expression.type === "CallExpression"
			&& statement.expression.callee.type === "Identifier"
			&& statement.expression.callee.name === "page"
}

class ComponentTrackingPlugin {
	constructor() {
		this.componentInfoMap = new Map();
		this.pageInfoMap = new Map();
	}
	apply(complier) {
		compiler.hooks.normalModuleFactory.tap(className, (factory) => {
			factory.hooks.parser
				.for('javascript/auto')
				.tap(className, (parser, options) => {
					const currentNormalModule = parser.state.module;

					parser.hooks.statement.tap(className, (statement) => {
						 if(checkPageModuleFromStatement(statement)) {
							const descriptionFile =
								currentNormalModule.resourceResolveData.descriptionFileData;
							this.pageInfoMap.set(currentNormalModule, {
								project: `${descriptionFile.name}@${descriptionFile.version}`,
								path: path.basename(currentNormalModule.resource)
							});
						 }
					}

					// ...
				});
			});
	}
}
```

위와 같이 Page 모듈과 모듈의 정보(파일이름, 프로젝트 이름)을 수집할 수 있습니다. 이전에 사용했던 `parser.hooks.finish` 를 사용할 수도 있지만 전체 AST 트리가 필요한 작업은 아니기에 `parser.hooks.statement` 훅을 사용해보았습니다.

지금까지 모듈별 컴포넌트들의 사용 내역과 페이지 모듈이 어떤 모듈인지 알아낼 수 있었습니다.

마지막으로 할 작업은 모듈간의 연결관계를 통해 어떤 페이지에 어떤 컴포넌트가 속해 있는지를 연결해주면 됩니다. webpack 내부에서 사용되는 `moduleGraph` 객체를 이용하면 모듈간의 의존관계를 탐색할 수 있습니다.

```javascript

function traverseModuleGraph(rooteNormalModule, graphModuleMap, checkModuleCallback) {
	const visited = new Map();
	const traverse = (crtNode) => {
		if (visited.get(crtNode)) return;

		visited.set(crtNode, true);
		const correspondingGraphModule = graphModuleMap.get(crtNode);

		if (!correspondingGraphModule) return;

		checkModuleCallback(crtNode, correspondingGraphModule);

		const childrens = new Set(
			Array.from(correspondingGraphModule.outgoingConnections || [], (c) => c.module)
		);

		for (const c of childrens) {
			traverse(c);
		}
	};
	traverse(rooteNormalModule);
}

class ComponentTrackingPlugin {
	constructor() {
		this.componentInfoMap = new Map();
		this.pageInfoMap = new Map();
	}
	apply(complier) {
		// ...

		compiler.hooks.compilation.tap(className, (compilation) => {
			compilation.hooks.finishModules.tap(className, (modules) => {
				const { moduleGraph: { _moduleMap: moduleMap } } = compilation;
				for(const [pageNormalModule, pageInfo] of this.pageInfoMap) {
					traverseModuleGraph(
						pargeNormalModule,
						moduleMap,
						(normalModule, graphModule) => {
							if(this.componentInfoMap.has(normalModule)) {
								pageInfo.components = [
									...pageInfo.components,
									...this.componentInfoMap.get(normalModule)
								];
							}
						}
					});
				}
			});
		});
	}
}
```

모듈 의존성 그래프을 탐색하기 위해서 `traverseModuleGraph` 라는 함수를 만들었는데 위에서 소개했던 [웹팩 번들링 과정](https://indepth.dev/posts/1482/an-in-depth-perspective-on-webpacks-bundling-process) 글의 내용을 참조했습니다.

간단히 해당 함수를 설명해보면, 웹팩에서 사용하는 모듈 소스 파일을 파싱된 결과물인 `NormalModule` 객체를 그래프간의 연결정보가 추가된 객체를 `ModuleGraphModule` 라는 객체로 다룹니다. 그래서 탐색에 필요한 그래프 모듈간의 연결정보인 `moduleMap`을 두번째 인자로 넣어주게 됩니다. 그리고 모듈을 탐색할 때마다 호출되는 callback 함수를 외부로 노출시켜서 하위 모듈이 탐색될 떄마다 외부에서 특별한 처리해줄 수 있도록 해주었습니다.

이제 component 정보를 page module과 연결해주기만하면 저희가 원하는 최종적인 결과물인 페이지 모듈마다 어떤 컴포넌트가 있는지를 확인할 수 있게됩니다.

최종적으로 결과물을 뽑아낼 수 있는 적절한 hook을 찾아보면 컴파일이 끝나는 훅인 `compiler.hooks.done`가 있으니 이를 활용해서 최종 결과물을 JSON 파일로 출력해보겠습니다.

```javascript
class ComponentTrackingPlugin {
  constructor() {
    this.componentInfoMap = new Map();
    this.pageInfoMap = new Map();
  }
  apply() {
    // ...
    compiler.hooks.done.tap(className, () => {
      if (!this.done) return;
      const result = JSON.stringify(Array.from(this.pageInfoMap.values()));
      fs.writeFile("tracking.json", result, (err) => {
        if (err) console.log(err);
        else {
          console.log("Generate tracking.json\n");
        }
      });
    });
  }
}
```

최종적으로 완성된 플러그인을 이용하면 아래와 같은 결과를 확인할 수 있습니다.

```json
[
  {
    "project": "sample1",
    "path": "HomePage.js",
    "components": ["Button"]
  },
  {
    "project": "sample1",
    "path": "DetailPage.js",
    "components": ["Button", "Button"]
  }
]
```

사실 위의 정보 정도로는 어떤 컴포넌트가 어떤 페이지에 몇번 사용되었느냐 정도의 정보만 얻을 수 있습니다.

# 정리

간단히 커스텀 Webpack Plugin를 이용해서 자바스크립트 번들링 시점에 컴포넌트의 사용을 추적해보았습니다. 아마 추가적인 정보도 AST분석을 잘한다면 얻어낼 수 있을 것 같습니다.

하지만 트랜스파일링된 결과물을 가지고 AST 분석해야하기에 예측하지 못한 경우가 많이 발생할 수 있습니다. 그래서 실제로 활용해보려한다면 아마 팀이나 프로젝트 단위로 강한 규칙을 둬야할 듯합니다.

# PoC 결론

이번 PoC 프로젝트를 진행하기 전에 확신을 가졌던 이유는 개발자가 코드를 뒤적거리며 컴포넌트가 사용되는 부분을 찾아다니는 형태는 코드가 충분히 해결해줄 수 있을 것이라고 생각했었기 때문이었습니다. 웹팩이라는 번들러의 도움을 크게 받아서 진행해보았고 결과적으로 개발 역량이 충분히 받쳐준다면 디자이너 혹은 개발자가 매번 특정 컴포넌트가 어디에서 사용됐는지 쫓아다니지 않아도 될 것으로 확인했습니다.

더해서 큰 조직에서 코어 라이브러리를 사용자들이 어떻게 사용하고 있는지 궁금하다면 Component들의 props를 위의 과정처럼 유사하게 추출해서 어떤 방향으로 디자인 컴포넌트 라이브러리를 확장하고 개선해나가야할지 핵심 지표로 활용할 수도 있을 것 같습니다.

그리고 무엇보다 이런 새로운 시도로 웹팩 플러그인과 번들링 과정자체를 학습했다는 것이 사이드 프로젝트의 값진 결과가 아닐까싶습니다.
