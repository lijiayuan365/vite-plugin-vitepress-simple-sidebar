import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import { visualizer } from "rollup-plugin-visualizer";


export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.mjs",
    format: "esm",
  },
  plugins: [
    typescript(),
    nodeResolve(),
    terser(),
    // visualizer(
    //   {
    //     // emitFile: true,
    //     // filename: "stats.html",
    //     open: true,  // 打包后自动打开页面
    //     gzipSize: true,  // 查看 gzip 压缩大小
    //     brotliSize: true // 查看 brotli 压缩大小
    //   }
    // )
  ],
  // external: ["fast-glob", "gray-matter"],
};
