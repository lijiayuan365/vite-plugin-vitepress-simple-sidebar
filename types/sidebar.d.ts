import type { Plugin } from "vite";

/**
 * 侧边栏入参
 */
export interface SidebarOptions {
  /** 指定生成 sidebar 的目录 */
  includeDirs?: string[],
  /** 排除掉 生成 sidebar的 目录*/
  excludeDirs?: string[],
  /** 指定生成 sidebar 的文件，这个感觉是没有意义的，但是为了保持一致，保留吧 */
  includeFiles?: string[],
  /** 排除掉 生成 sidebar的 文件，比如 index.md 这种不想出现在sidebar 中 */
  excludeFiles?: string[],
}

export function autoSidebar(options?: SidebarOptions): Plugin;