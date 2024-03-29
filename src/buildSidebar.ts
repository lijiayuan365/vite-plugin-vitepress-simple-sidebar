// 引入必要的库
import { promises as fs } from 'fs';
import path from 'path';

import type { SidebarItem } from './types/index';
import { awaitTo, getMdTitle, unionArrays } from './utils';
import { SidebarOptions } from '../types';

const DEFAULT_EXCLUDE_DIRS = ['.vitepress'];
/** 文档项目的根路径 */
let ROOT_PATH = '';
/** 指定生成 sidebar 的目录和文件 */
let includes: string[] = [];
/** 排除掉 生成 sidebar的 目录与文件 */
let excludes: string[] = [];

function buildNode(fileName: string, isDirectory: boolean, filePath: string): SidebarItem {
  const item: SidebarItem = { text: fileName };
  item.text = fileName;
  if (isDirectory) {
    item.collapsed = true,
    item.items = [];
  } else {
    item.link = `/${path.relative(ROOT_PATH, filePath)}`
  }
  return item;
}
/**
 * 递归遍历目录
 * @param parentPath 父目录
 * @param options 插件配置
 * @returns 
 */
async function buildTree(parentPath: string, options: SidebarOptions): Promise<SidebarItem | void> {
  const result = buildNode(path.basename(parentPath), true, parentPath);
  const [err, files] = await awaitTo(fs.readdir(parentPath));
  if (err) return console.log(`Error`, err);
  for (const item of files) {
    if (excludes.includes(item)) continue;
    if (includes.length && !includes.includes(item)) continue;
    const filePath = path.join(parentPath, item);
    const [e, stats] = await awaitTo(fs.lstat(filePath));
    if (e) return console.log(`err, ${e}`);
    if (stats.isDirectory()) {
      buildTree(filePath, options).then((tree) => {
        if (tree) {
          result.items?.push(tree)
        }
      })
    } else {
      // 过滤非 md 文件操作
  if (!filePath.endsWith('.md')) continue;
      let fileName = path.basename(filePath, '.md');
      if (options.useMarkdownTitle) {
        const [err, title] = await awaitTo(getMdTitle(filePath));
        if (!err && title) {
          fileName = title;
        }
      }
      const node = buildNode(fileName, false, filePath);
      result.items?.push(node)
    }
  }

  return result;
}

/**
 * 
 * @param rootPath
 * @returns
 */
async function buildSidebar(
  rootPath: string | undefined,
  options: SidebarOptions
): Promise<Record<string, SidebarItem[]> | void> {
  if (!rootPath) return {};
  ROOT_PATH = rootPath;
  const result: Record<string, SidebarItem[]> = {};

  // 入参配置处理
  const {
    excludeDirs = [],
    excludeFiles = [],
    includeDirs = [],
    includeFiles = [],
  } = options;
  excludes = unionArrays(DEFAULT_EXCLUDE_DIRS, [
    ...excludeDirs,
    ...excludeFiles,
  ]);
  includes = unionArrays(includeDirs, includeFiles);

  const [err, files] = await awaitTo(fs.readdir(rootPath));
  if (err) return console.log(`Error`, err);
  for (const item of files) {
    if (excludes.includes(item)) continue;
    if (includes.length && !includes.includes(item)) continue;
    const filePath = path.join(rootPath, item);
    const [e, stats] = await awaitTo(fs.lstat(filePath));
    if (e) return console.log(`Error`, err);
    // 只处理文档根目录的文件夹，文件不处理
    if (stats.isDirectory()) {
      const [e2, sidebarItem] = await awaitTo(buildTree(filePath, options))
      if (e2) return console.log('Error', e2);
      if (!sidebarItem) return console.log('sidebar 生成失败');
      result[`/${sidebarItem.text}/`] = sidebarItem.items || [];
    }
  }

  return result;
}

export default buildSidebar;
