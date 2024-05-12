<h1 align="center">unplugin-uni-api-checker</h1>

[![npm version](https://badgen.net/npm/v/unplugin-uni-api-checker)](https://github.com/Nibblerrr/unplugin-uni-api-checker)

<h3 align="center">在终端提示使用的 uniapp API 在不同平台的兼容性和不兼容的 API</h3>

## ⚙️ 安装

根据你的包管理器，使用以下命令安装

```bash
npm i unplugin-uni-api-checker -D
# Or pnpm
pnpm add unplugin-uni-api-checker -D
# Or Yarn
yarn add unplugin-uni-api-checker --dev
```

## 📖 使用

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import APIChecker from 'unplugin-uni-api-checker/vite'

export default defineConfig({
  plugins: [
    APIChecker({
      /* options */
    }),
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import APIChecker from 'unplugin-uni-api-checker/rollup'

export default {
  plugins: [
    APIChecker({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-uni-api-checker/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    [
      'unplugin-uni-api-checker/nuxt',
      {
        /* options */
      },
    ],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-uni-api-checker/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import APIChecker from 'unplugin-uni-api-checker/esbuild'

build({
  plugins: [APIChecker()],
})
```

<br></details>

## 🔧 配置

buildModeOnly 指定是否只在 build 时提示，默认会在 dev 和 build 运行
fileExtensions 增加匹配的后缀文件，默认支持.vue、.js、.ts、.jsx、.tsx

```ts
APIChecker({
  /* 默认配置 */
  buildModeOnly: false,
  fileExtensions: [],
})
```

## 项目使用

本项目使用 Anthony Fu 的模板 [unplugin](https://github.com/unplugin/unplugin-starter).

克隆后安装好依赖

```bash
pnpm i
```

在 playground 中增加测试的项目，在其配置文件中导入插件使用
play 命令默运行行微信小程序
play-build:XXX 进行项目不同平台的打包
crawler 进行 uniapp api 兼容性列表爬取

```bash
pnpm run play
pnpm run play-build:h5
pnpm run crawler
# 更多查看package.json
```

## 📄 License

MIT License © 2021-PRESENT Anthony Fu
