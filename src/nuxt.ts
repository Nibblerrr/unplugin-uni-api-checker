import { addVitePlugin, addWebpackPlugin, defineNuxtModule } from '@nuxt/kit'
import vite from './vite'
import webpack from './webpack'
import type { Options } from './core/types'
import '@nuxt/schema'

export interface ModuleOptions extends Options {}

export default defineNuxtModule<Options>({
  meta: {
    name: 'nuxt-unplugin-uni-api-checker',
    configKey: 'unpluginStarter',
  },
  defaults: {
    // ...default options
    buildModeOnly: false,
    fileExtensions: [],
  },
  setup(options, _nuxt) {
    addVitePlugin(() => vite(options))
    addWebpackPlugin(() => webpack(options))

    // ...
  },
})
