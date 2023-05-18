export function deepCompareSimpleObjects(obj1: any, obj2: any): boolean {
  const str1 = JSON.stringify(obj1);
  const str2 = JSON.stringify(obj2);

  return str1 === str2;
}
