import { promises as fs } from 'fs';

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
function awaitTo<T, U = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

/** 节流 */
function throttle<T extends (...args: any[]) => void>(func: T, delay: number) {
  let lastExecTime = 0;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const currentTime = Date.now();
    const timeSinceLastExec = currentTime - lastExecTime;

    if (timeSinceLastExec >= delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - timeSinceLastExec);
    }
  };
}
/**
 * 数组并集
 * @param arr1 
 * @param arr2 
 * @returns 
 */
function unionArrays<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set([...arr1, ...arr2]);
  return Array.from(set);
}

const headingRegex = /^#\s([^\n]+)/gm;
async function getMdTitle(mdPath: string) {
  const [e, data] = await awaitTo(fs.readFile(mdPath, 'utf-8'))
  if(e) return;
  // // 使用正则表达式查找所有一级标题
  let match: string[] | null;
  const headings: string[] = [];
  while ((match = headingRegex.exec(data)) !== null) {
    // match[1] 包含匹配的标题文本
    headings.push(match[1].trim())
  }
  return headings[0];
  
}

export {
  awaitTo,
  throttle,
  unionArrays,
  getMdTitle,
};