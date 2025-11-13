import type { NitroPreset } from 'nitropack';

import { fileURLToPath } from 'node:url';
import type { PresetNameInput } from 'nitropack/presets';
// https://help.aliyun.com/zh/edge-security-acceleration/esa/user-guide/runtimeapi-manual#d33c01c145g7i
// sea 支持的 node api
export const builtnNodeModules = [
  'assert',
  'async_hooks',
  'buffer',
  'crypto',
  'diagnostics_channel',
  'path',
  'process',
  'stream',
  'string_decoder',
  'util'

  // 不支持模块
  // 'os',
  // 'fs',
  // 'net',
  // 'tls',
  // 'perf_hooks',
];
export default <NitroPreset>{
  extends: 'base-worker' as PresetNameInput[] | PresetNameInput,
  entry: fileURLToPath(new URL('./entry.ts', import.meta.url)),
  // 静态文件内联（不建议生产模式开启，仅用于 dev 测试）
  // serveStatic: 'inline',
  rollupConfig: {
    output: {
      format: 'module'
    }
  },
  unenv: {
    external: [...builtnNodeModules.flatMap(m => `node:${m}`)],
    alias: {
      ...Object.fromEntries(
        builtnNodeModules.flatMap(m => [
          [m, `node:${m}`],
          [`node:${m}`, `node:${m}`]
        ])
      )
    }
  },
  commands: {
    preview: 'esa dev',
    deploy: 'esa deploy'
  },
  hooks: {}
};
