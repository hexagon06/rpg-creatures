import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/guide/build.html#library-mode
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2
          }
        }
      }
    })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "./src/styles/variables.scss";
  //         @import "./src/styles/classes.scss";
  //       `,
  //     },
  //   },
  // },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
