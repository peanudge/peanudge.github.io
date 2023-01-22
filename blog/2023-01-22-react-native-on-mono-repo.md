---
title: Setting React Native on Mono Repo(Nx)
description:
slug: react-native-on-mono-repo
authors: jiho
tags: [react-native, nx, mono-repo]
# Display h2 to h5 headings
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# 모노 레포에서의 react-native 설정 방법

react native 프로젝트를 웹 프로젝트들과 함께 관리하고 유틸 함수를 함께 관리하면 용이할 것 같아서 구성을 해보게 되었습니다.

[NX](https://nx.dev/getting-started/package-based-repo-tutorial)를 이용해서 React Native 프로젝트를 포함한 모노레포를 구성할 때 3가지 옵션이 있습니다.

- NX에서 재공해주는 React Native Project 템플릿 이용하기
- yarn workspace를 이용해서 `npx react-native init` 으로 구성. (`no-hoist` 옵션으로 React Native 프로젝트 따로 격리)
- yarn workspace를 이용해서 `npx react-native init` 으로 구성. (스크립트들의 경로를 직접 수정)

## NX에서 재공해주는 React Native Project 템플릿 이용하기

https://nx.dev/packages/react-native

NX에서 react native를 위한 프로젝트 구성이 있어서 해당 템플릿을 이용하는게 NX 모노레포에서는 이상적인 것 같았지만 React Native 업데이트마다 구성을 쉽게 수정할 수 있을까에 대한 고민이 있었습니다. 그리고 이 템플릿은 같은 모노레포 내 다른 프로젝트들의 공유를 위해 typescript tsconfig의 `path` 기능을 활용합니다.

직접 프로젝트를 구성하며 시행착오를 겪었지만 typescript 구성(`compoiste`)에 이슈가 있고 github issue 커뮤니케이션을 보니 빠른시기에 해결책이 나올 것 같지않아 해당 방법은 추후에 다시 시도해보기로 했습니다. (https://github.com/nrwl/nx/issues/12417)

## `npx react-native init` with `no-hoist`option

react native의 `npx react-native init`을 이용해서 모노레포의 하위 폴더에 설치 후, 앱을 실행해보려하면 여러가지 경로 관련 에러가 발생하게됩니다. `react-native`의 metro 서버를 실행하기까지 여러 스크립트들이 상대 경로로 작성된 것들이 많아서 그렇습니다.

처음에는 유지보수 측면에서 그러한 설정들을 최대한 수정하고 싶지않을 방법을 찾아보니 yarn의 `no-hoist` 옵션을 활용하면 될 것 같아 보였습니다.

yarn 의 [`no-hoist` 옵션](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/)은 yarn 의 workspaces로 여러 패캐지를 관리하려할 때 특정 패키지들은 개별 디렉토리 경로에 `node_modules`를 따로 두어 공유하지않도록 하는 방법입니다. 사실 가장 간편한 방법이지만 이렇게 할 경우, 따로 repo를 만드는게 더 나을 것 같아 해당 방식은 적용하지 않는게 나을 듯합니다.

## `npx react-native init` with 직접 경로 수정

위 두 가지 방법을 적용해보고 장,단점을 따져보니 `react-native`의 빌드, 배포스크립트들을 수정하는게 어렵지않다면 빠르게 수정하는게 좋을 듯 싶어서 진행해보았고 수정할 양이 많지않고 리액트 버젼 업데이트를 쫓아가기도 쉬울 것 같아서 해당 방식을 채택하기로했습니다.

간단히, 어떤 스크립트들을 수정하면 되는지 최신 버젼의 CLI로 만들어지는 프로젝트 템플릿을 토대로 수정을 진행해보고자 합니다.

주로 아래 링크를 참고많이 하였고 최신화된 부분들도 있으니 참고 바랍니다.

> https://www.callstack.com/blog/setting-up-react-native-monorepo-with-yarn-workspaces

### 프로젝트 생성

모노레포를 아래와 같은 구조로 만든다고 해보겠습니다.

```
your-project
|-- package.json
|-- packages
    |-- mobile
        |-- package.json
    |-- web
        |-- package.json
```

mobile 프로젝트는 아래와 CLI를 통해 프로젝트 템플릿으로 생성하게 됩니다.

```bash
$ npx react-native init mobile
```

### ios 관련 스크립트 수정

- ios/Podfile 수정

실제 node_modules의 경로를 가리키도록 관련 경로를 수정해줍니다.

```ruby
# 수정 ../node_modules => ../../../node_modules
require_relative '../../../node_modules/react-native/scripts/react_native_pods'

# 수정 ../node_modules => ../../../node_modules
require_relative '../../../node_modules/@react-native-community/cli-platform-ios/native_modules'

# ...

target 'SampleApp' do
  config = use_native_modules!
    # ...
    post_install do |installer|
        react_native_post_install(
        installer,
        # 추가: 해당 인자를 추가해줍니다.
        # "node_modules/react-native/scripts/react_native_pods" 루비 스크립트를 확인하면
        # 입력이 없으면 "../node_modules/react-native" 로 처리됩니다.
        "../../../node_modules/react-native",
        :mac_catalyst_enabled => false
        )
        __apply_Xcode_12_5_M1_post_install_workaround(installer)
    end
    # ...
end
```

- Project settings > Build Phases open “Bundle React Native code and images”

```
set -e

- WITH_ENVIRONMENT="../../node_modules/react-native/scripts/xcode/with-environment.sh"
- REACT_NATIVE_XCODE="../../node_modules/react-native/scripts/react-native-xcode.sh"
+ WITH_ENVIRONMENT="../../../node_modules/react-native/scripts/xcode/with-environment.sh"
+ REACT_NATIVE_XCODE="../../../node_modules/react-native/scripts/react-native-xcode.sh"

/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
```

위처럼 경로에 `../../`를 추가해줍니다.

### android 스크립트 수정

- `android/settings.gradle` 수정

```
rootProject.name = 'SampleApp'
apply from: file("../../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)
include ':app'
includeBuild('../../../node_modules/react-native-gradle-plugin')
```

마찬가지로, `../../` 경로를 추가해줍니다.

- `android/app/build.gradle` 수정

```
//   The folder where the react-native NPM package is. Default is ../node_modules/react-native
reactNativeDir = file("../../../../node_modules/react-native")
//   The folder where the react-native Codegen package is. Default is ../node_modules/react-native-codegen
codegenDir = file("../../../../node_modules/react-native-codegen")
//   The cli.js file which is the React Native CLI entrypoint. Default is ../node_modules/react-native/cli.js
cliFile = file("../../../../node_modules/react-native/cli.js")

...

apply from: file("../../../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)
```

`android/app/build.gradle` 파일에서는 파일 depth가 더 깊기떄문에 주의해서 경로를 수정해줍니다.

`../../../../node_modules` 로 스크립트들이 처리되도록 해주면 안드로이드 세팅이 마무리되게 됩니다.

### `metro.config.js` 수정

```javascript
const path = require("path");

module.exports = {
  watchFolders: [path.resolve(__dirname, "../../node_modules")],
  // ...
};
```

마지막으로 metro가 `node_modules`의 정확한 위치를 알 수 있도록 위 `watchFolders` 값을 추가해주도록 합니다.

# 정리

React Native를 mono repo로 설정하기 위한 3가지 옵션을 제안해봤고 최종적으로 채택한 React Native 공식 템플릿을 기반으로 `node_modules` 경로를 스크립트에서 직접 수정하는 방법 채택하고 설정해봤습니다.

사실 NX에서 제공하는 프로젝트 템플릿이 어느정도 증명되면 그 방식을 채택하는 것이 나을 것입니다.

하지만, NX를 관리하는 팀의 큰 관심사가 아니라는 것을 깃허브 이슈 커뮤니케이션을 통해 알 수 있으니 직접 수정하는 것이 현명한 선택이라 판단했습니다. 아무래도 React Native를 계속 다룰 생각이라면 내부적으로 저수준에서 어떻게 처리되는지 파악하는게 중요할 것 같습니다.

# Reference

> https://nx.dev/packages/react-native

> https://classic.yarnpkg.com/blog/2018/02/15/nohoist/

> https://www.callstack.com/blog/setting-up-react-native-monorepo-with-yarn-workspaces
