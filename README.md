# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

`.env.teplate` 파일에서 `GIT_PASS` 에 PERSONAL ACCESS TOKEN을 생성해서 넣어줘야함.

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

> 🚧 `gh-pages`를 default branch로 가지지만 setting - Pages 에서 github page branch는 수정해줘야함.
