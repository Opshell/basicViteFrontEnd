import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            imports: [
              "vue",
              "vue-router",
              "vuex",
              {
                "@vueuse/core": [
                  "useMouse",
                  ["useFetch", "useMyFetch"]
                ],
                axios: [
                  ["default", "axios"]
                ],
                vue: ["PropType", "defineProps", "InjectionKey", "Ref"]
              }
            ],
            dirs: [],
            dts: "src/types/auto-imports.d.ts",
            vueTemplate: false,
            eslintrc: {
              enabled: false,
              filepath: "./.eslintrc-auto-import.json",
              globalsPropValue: true
            }
        }),
        Components({
            dirs: ['src/components', 'src/views'], // 指定components位置 預設是'src/components'
            // include: [/\.vue$/],
            dts: 'src/types/components.d.ts', // .d.ts生成位置
            extensions: ['vue'],
        }),
    ],

    resolve: {
        alias: { // 設定別名
            '@': path.resolve(__dirname, 'src') // 根目錄下的 src 資料夾
        }
    }
});
