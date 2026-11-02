function addPlurals(words: string[]) {
  return words.reduce<string[]>((final, current) => {
    final.push(current)
    final.push(`${current}s`)
    final.push(`${current}es`)
    return final
  }, [])
}

export default addPlurals
