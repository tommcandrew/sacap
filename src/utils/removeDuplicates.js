const removeDuplicates = arr => {
  const set = new Set(arr)
  const uniqueArr = [...set]
  return uniqueArr
}

export default removeDuplicates
