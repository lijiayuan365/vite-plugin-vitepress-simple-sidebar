# vite-plugin-vitepress-simple-sidebar
[中文文档](./README-CN.md)

`vite-plugin-vitepress-simple-sidebar` is a plugin designed to automatically generate sidebar configurations for VitePress projects. It reads the file and subdirectory structure in the specified directory (default to the `.vitepress` folder) to create a navigation sidebar, simplifying the configuration process and improving development efficiency.

## Example Directory Structure

Assuming your project has the following directory structure:

```sh
.
├── .vitepress
├── component.md
├── experience
│   ├── 2024
│   │   └── makeblock-interview.md
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

Using this plugin, the following sidebar configuration will be automatically generated:

```json
{
  "/experience/": [
    {
      "text": "2024",
      "items": [
        {
          "text": "makeblock-interview",
          "link": "/experience/2024/makeblock-interview"
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

## Installation

Install the `vite-plugin-vitepress-simple-sidebar` plugin in your project:

```sh
# Recommended to use pnpm
pnpm i vite-plugin-vitepress-simple-sidebar -D

# Or use npm
npm i vite-plugin-vitepress-simple-sidebar --save-dev
```

## Configuration

In your VitePress configuration file (usually `.vitepress/config.mts` or `.vitepress/config.ts`), import and configure the plugin:

```ts
// .vitepress/config.mts
import { autoSidebar } from 'vite-plugin-vitepress-simple-sidebar'

export default defineConfig({
  vite: {
    plugins: [
      autoSidebar({
        // Custom configuration can be added here, see below for details
      }),
    ],
  },
});
```

## Plugin Configuration Options

The `autoSidebar` function accepts an optional configuration object `SidebarOptions` to customize the sidebar generation behavior:

```ts
export interface SidebarOptions {
  includeDirs?: string[];
  excludeDirs?: string[];
  includeFiles?: string[];
  excludeFiles?: string[];
  // Additional configuration options will be added in future versions
}
```

- `includeDirs`: Specify directories to include in sidebar generation.
- `excludeDirs`: Specify directories to exclude from sidebar generation.
- `includeFiles`: Specify files to include in the sidebar.
- `excludeFiles`: Specify files to exclude from the sidebar.

By default, if no configuration parameters are passed, the plugin will scan the `.vitepress` directory and generate the corresponding sidebar configuration.

## Future Plans

The `vite-plugin-vitepress-simple-sidebar` plugin is still under active development, with more configuration options and features to be added to meet the needs of different projects. We welcome contributions and feedback from the community to jointly create a more perfect VitePress plugin ecosystem.

translated by AI
 