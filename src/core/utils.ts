export function getFileName(id: string) {
  const index = id.lastIndexOf('?')
  if (index === -1) {
    return id
  } else {
    return id.slice(0, index)
  }
}
