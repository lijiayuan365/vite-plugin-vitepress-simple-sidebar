# vite-plugin-vitepress-simple-sidebar

**提示** 该项目不再更新，塞到这个[项目](https://github.com/lijiayuan365/vite-plugin-vitepress-utils)进行一个修改。

`vite-plugin-vitepress-simple-sidebar` 插件旨在为 VitePress 项目自动生成侧边栏配置。它根据指定目录（默认为 `.vitepress` 文件夹）中的文件和子目录结构，自动创建侧边栏导航，简化配置流程，提高开发效率。

## 示例目录结构

假设你的项目具有以下目录结构：

```sh
.
├── .vitepress
├── component.md
├── experience
│   ├── 2024
│   │   └── makeblock一面.md
│   └── index.md
├── index.md
├── interview
│   ├── Vue
│   │   └── test.md
│   ├── Vue3
│   │   └── index.md
│   └── index.md
├── markdown-examples.md
└── test.md
```

使用本插件后，将自动生成如下的侧边栏配置：

```json
{
  "/experience/": [
    {
      "text": "2024",
      "items": [
        {
          "text": "makeblock一面",
          "link": "/experience/2024/makeblock一面"
        }
      ],
      "collapsed": true
    },
    {
      "text": "index",
      "link": "/experience/index"
    }
  ],
  "/interview/": [
    {
      "text": "Vue",
      "items": [
        {
          "text": "test",
          "link": "/interview/Vue/test"
        }
      ],
      "collapsed": true
    },
    {
      "text": "Vue3",
      "items": [
        {
          "text": "index",
          "link": "/interview/Vue3/index"
        }
      ],
      "collapsed": true
    },
    {
      "text": "index",
      "link": "/interview/index"
    }
  ]
}
```

## 安装

在你的项目中安装 `vite-plugin-vitepress-simple-sidebar` 插件：

```sh
# 推荐使用 pnpm
pnpm i vite-plugin-vitepress-simple-sidebar -D

# 或者使用 npm
npm i vite-plugin-vitepress-simple-sidebar -D
```

## 配置

在你的 VitePress 配置文件中（通常是 `.vitepress/config.mts` 或 `.vitepress/config.ts`），引入并配置插件：

```ts
// .vitepress/config.mts
import { autoSidebar } from 'vite-plugin-vitepress-simple-sidebar'

export default defineConfig({
  vite: {
    plugins: [
      autoSidebar({
        // 在这里可以添加自定义配置，具体选项见下文
      }),
    ],
  },
});
```

## 插件配置选项

`autoSidebar` 函数接受一个可选的配置对象 `SidebarOptions`，用于自定义侧边栏生成的行为：

```ts
export interface SidebarOptions {
  includeDirs?: string[];
  excludeDirs?: string[];
  includeFiles?: string[];
  excludeFiles?: string[];
  // 其他可能的配置选项将在未来版本中添加
}
```

- `includeDirs`: 指定要从中生成侧边栏的目录。
- `excludeDirs`: 指定要从侧边栏生成过程中排除的目录。
- `includeFiles`: 指定要包含在侧边栏中的文件。
- `excludeFiles`: 指定要从侧边栏中排除的文件。

默认情况下，如果不传入任何配置参数，插件将会扫描 `.vitepress` 目录并生成相应的侧边栏配置。

## 后续计划

`vite-plugin-vitepress-simple-sidebar` 插件目前还在积极开发中，未来将会添加更多的配置选项和功能，以满足不同项目的需求。我们欢迎社区的贡献和反馈，以共同打造一个更加完善的 VitePress 插件生态。
