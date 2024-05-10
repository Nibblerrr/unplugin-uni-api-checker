import process from 'node:process'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'

import type { Options } from './types'
import findAPI from './check'
import showApi from './showApi'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  if (options?.buildModeOnly && process.env.NODE_ENV !== 'production') {
    // 在非生产（非打包）环境中，不执行任何操作
    return {
      name: 'empty-plugin',
    }
  } else {
    return {
      name: 'unplugin-uni-api-checker',
      transformInclude(id) {
        const endsWithFile = ['.ts', '.js', '.vue', '.tsx', 'jsx', ...(options?.fileExtensions ?? [])]
        return endsWithFile.some((item) => id.endsWith(item))
      },
      transform(code, id) {
        const usedJsonValues = findAPI(code)
        showApi(usedJsonValues, id, process.env.UNI_PLATFORM)
        return code
      },
    }
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
