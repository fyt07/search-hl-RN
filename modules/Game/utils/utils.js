
export const checkWin = (name, target) => {
  const dflt = ['Гитлер, Адольф', 'Адольф Гитлер', 'Гитлер']
  const win = dflt.find(i => i === name)
    || (target && name.toLowerCase().indexOf(target.toLowerCase()) !== -1)
  return win
}
export const shuffle = list => {

  var j, temp, arr = list;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr
}

export const getCurrentLink = item => {
  const firstLetter = item.title[0]
  if (
    item.ns === 0
    && isNaN(+firstLetter)
    && firstLetter !== '.'
  ) {
    return true
  }
  return false
}