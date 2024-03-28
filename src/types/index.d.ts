/**
 *  sidebar 项目
 */
export interface SidebarItem {
  /** sidebar名称 文件名 */
  text: string,
  /** 相对根目录的路径 */
  link?: string,
  /** 是否为目录 */
  collapsed?: boolean,
  /** 子项目 */
  items?: SidebarItem[]
}
