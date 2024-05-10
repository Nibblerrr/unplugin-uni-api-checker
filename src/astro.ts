import type { Options } from './core/types'

import unplugin from '.'

export default (options: Options) => ({
  name: 'unplugin-uni-api-checker',
  hooks: {
    'astro:config:setup': async (astro: any) => {
      astro.config.vite.plugins ||= []
      astro.config.vite.plugins.push(unplugin.vite(options))
    },
  },
})
