import * as parser from '@babel/parser'

import _traverse from '@babel/traverse'
import type { NodePath } from '@babel/traverse'

import compatibilityList from '../crawler/result1.json'

const traverse = _traverse.default
const jsonKeys = Object.keys(compatibilityList) // 从JSON中提取所有键

export default function findAPI(sourceCode: string) {
  // 解析源代码为AST
  const ast = parser.parse(sourceCode, { sourceType: 'module', plugins: ['jsx'] })
  // 创建一个集合记录使用的JSON键
  const usedJsonValues: Set<string> = new Set()

  // 遍历AST
  traverse(ast, {
    enter(path: NodePath) {
      // 对于各种节点类型的检查...
      if (path.node.type === 'MemberExpression' && !path.node.computed) {
        // 确保成员表达式不是计算的，例如 json[key] - 这是动态的
        // 检查 object 是不是一个 Identifier
        let objectName, propertyName
        if (path.node.object.type === 'Identifier') {
          objectName = path.node.object.name
        }

        // 检查 property 是不是一个 Identifier
        if (path.node.property.type === 'Identifier') {
          propertyName = path.node.property.name
        }
        // console.log(objectName, propertyName)
        // 如果 objectName 和 propertyName 都有值，那么进行匹配
        const entireName = `${objectName}.${propertyName}`
        if (objectName && propertyName && jsonKeys.includes(entireName)) {
          usedJsonValues.add(entireName)
        }
      }
    },
  })

  return usedJsonValues
}
