function matrixReshape(mat: number[][], r: number, c: number): number[][] {
  if (mat.length * mat[0].length !== r * c || (mat.length === r && mat[0].length === c))
    return mat;
  const ret: number[][] = [];
  const arr = mat.flat();
  let counter = 0
  for (let i = 0; i < r; i++) {
    ret.push([]);
    for (let j = 0; j < c; j++) {
      ret[i].push(arr[counter++])
    }
  }
  return ret;
};
function generate(numRows: number): number[][] {
  const ret: number[][] = [];
  ret.push([1]);
  for (let i = 1; i < numRows; i++) {
    ret.push([1]);
    for (let j = 1; j < i; j++)
      ret[i].push(ret[i - 1][j - 1] + ret[i - 1][j]);
    ret[i].push(1);
  }
  return ret;
};
function isValidSudoku(board?: string[][]): boolean {
  const map = new Map<number, number>([
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0],
  ])

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // map.set()
    }
  }
  return true;
};
function firstUniqChar(s: string): number {
  const map: Record<string, number> = {};
  const arr = [...s];
  arr.forEach(val => {
    if (map[val])
      map[val]++;
    else map[val] = 1;
  });
  let it = 0;
  for (const k in map) {
    if (map[k] === 1)
      return it;
    it++;
  }
  return -1;
};
function canConstruct(ransomNote: string, magazine: string): boolean {
  const rn = [...ransomNote];
  const m = [...magazine];
  const rMap = new Map<string, number>();
  const mMap = new Map<string, number>();
  rn.forEach(val => rMap.set(val, 0));
  console.log(rMap);

  return false;
};
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function hasCycle(head: ListNode | null): boolean {
  if(head == null) return true;
  
  return true;
};
const test = (i:number, j:number) => {
  console.log(i + j);
}
const fun = async() => {
  //setInterval(test, 1000, 3, 333);
  for(let i = 0; i < 100; i++)
    ;
  console.log('batata');
  
}
fun();
console.log('hah');
