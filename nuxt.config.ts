import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nitro: {
    // npm run build -- --preset=./preset
    // preset:"./preset"
    // 静态文件内联（不建议生产模式开启，仅用于 dev 测试）
    // serveStatic: 'inline',
    experimental: {
      // 开启openapi
      openAPI: true
    },
    openAPI: {
      route: '/swagger/openapi.json',
      // 生产环境开启
      production: 'prerender', // 或 "prerender"
      ui: {
        scalar: false,
        swagger: {
          // swagger ui 路由 默认 /_swagger
          route: '/swagger'
        }
      }
    },
    hooks: {
      'build:before'(nitro) {
        // openapi 修改
        if (nitro.options.experimental?.openAPI) {
          const openApiJson = nitro.options.openAPI?.route || '/_openapi.json';

          const openapi =
            existsSync(join(nitro.options.output.publicDir, openApiJson)) &&
            JSON.parse(readFileSync(join(nitro.options.output.publicDir, openApiJson), 'utf-8'));

          if (openapi) {
            delete openapi.servers;
            writeFileSync(
              join(nitro.options.output.publicDir, openApiJson),
              JSON.stringify(openapi)
            );
          }
        }
      }
    }
  }
});
