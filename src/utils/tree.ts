import { WordType } from './types'

function eachBefore(node: any, callback: (node: any) => void) {
  callback(node)
  node.children && node.children.forEach((item: any) => eachBefore(item, callback))
}

function coptTree(tree: any) {
  const data = { ...tree, children: [] }
  function eachBefore(node: any, data: any) {
    node.children &&
      node.children.forEach((item: any) => {
        const child = { ...item, children: [] }
        data.children.push(child)
        eachBefore(item, child)
      })
  }
  eachBefore(tree, data)
  return data
}

function descendant(root: any) {
  const nodes: any[] = []
  eachBefore(root, node => nodes.push(node))
  return nodes
}

export { eachBefore, coptTree, descendant }

export default function(root: any[]) {
  let index = -1
  const nodes: any[] = []
  function setDepth(node: any) {
    nodes.push({
      ...node,
      depth: ++index,
    })
    node.children && node.children.forEach(setDepth)
    index--
  }
  setDepth(root)
  return nodes
}
