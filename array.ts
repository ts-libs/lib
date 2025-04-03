export function removeItemFrom<T>(arry:Array<T>, item:T) {
  const index = arry.indexOf(item);
  if (index<0) {
    return;
  }
  arry.splice(index, 1);
}