# beitou-protals

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```


## 对接CAS逻辑

当门户服务器返回401时跳转CAS
当CAS心跳返回4001时跳转CAS
当用户主动登出时跳转CAS

所以如果客户端没有TOKEN时，主动访问任何需要TOKEN的接口即可返回401从而触发跳转。这样做的含义就是用户未登录则无法使用
如果客户端没有TOKEN时，不去访问任何需要TOKEN的接口即可实现用户手工登录，从而保留未登录页的首页状态

