import { utimesSync } from "fs";

import type { DefaultTheme, SiteConfig } from 'vitepress';
import type { Plugin } from 'vite';

import buildSidebar from './buildSidebar';
import { awaitTo, throttle } from './utils';

import type { SidebarOptions } from '../types/index';

interface UserConfig {
  vitepress: SiteConfig<DefaultTheme.Config>;
}


// /** 文件变动事件 */
async function mdWatcher(
  configPath: string | undefined,
  event: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir',
  path: string,
) {
  // 过滤非 md 文件操作
  if (!path.endsWith('.md')) return;
  if (event === 'change') {
    // 文件内容变化不更新
  } else {
    configPath && forceReload(configPath);
  }
}

function autoSidebar(options: SidebarOptions = {}): Plugin {
  return {
    name: 'vite-plugin-vitepress-simple-sidebar',
    // md 文件增删或配置修改时，通过触发配置文件修改操作，实现刷新
    async configureServer({ config, watcher }) {
      const {
        vitepress: { configPath },
      } = config as unknown as UserConfig;
      // // 添加 1500ms 的节流，避免同时保存多个文件时重复触发刷新
      watcher.on('all', throttle(mdWatcher.bind(null, configPath), 3000));
    },
    async config(config) {
      const {
        root
      } = config;
      console.log('sidebar 生成中...');
      const [err, sidebar] = await awaitTo(buildSidebar(root, options));
      if (err) return console.log('err', err);
      if (!sidebar) return console.log('sidebar 生成失败', err);
      console.log('sidebar 结束');
      (config as unknown as UserConfig).vitepress.site.themeConfig.sidebar = sidebar;
    },
  };
}

/** 强制重启开发服务器，实现刷新 */
function forceReload(path: string) {
  // 修改配置文件系统时间戳，触发更新
  utimesSync(path, new Date(), new Date());
}


export { autoSidebar };
