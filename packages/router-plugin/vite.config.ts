import { defineConfig, mergeConfig } from 'vitest/config'
import { tanstackBuildConfig } from '@tanstack/config/build'

const config = defineConfig({})

export default mergeConfig(
  config,
  tanstackBuildConfig({
    entry: ['./src/index.ts', './src/vite.ts', './src/rspack.ts'],
    srcDir: './src',
  }),
)
