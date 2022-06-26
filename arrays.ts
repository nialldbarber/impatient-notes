import { assertEquals } from "https://deno.land/std@0.145.0/testing/asserts.ts"

/**
  Use Array.prototype.flatMap() to do so.
  Use Number() to convert arbitrary values to numbers.
*/
const convertToNumbers = (arr: any[]) =>
  arr
    .flatMap((currentValue) => Number(currentValue))
    .filter((item) => !isNaN(item))

Deno.test("convertToNumbers() via flatMap()", () => {
  assertEquals(convertToNumbers(["", "1", "2", "abc", "3"]), [0, 1, 2, 3])
  assertEquals(convertToNumbers([4, 5, NaN, 6, NaN, 7]), [4, 5, 6, 7])
  assertEquals(convertToNumbers([false, true, null, undefined]), [0, 1, 0])
})

/**
  Use Array.prototype.reduce()
*/
const countMatches = (arr: any[], callbackFn: (num: number) => boolean) =>
  arr.reduce(
    (previousValue, currentValue) =>
      callbackFn(currentValue) ? previousValue + 1 : previousValue,
    0
  )

Deno.test("countMatches() via .reduce()", () => {
  assertEquals(
    countMatches([1, 2, 3], (x) => x < 0),
    0
  )
  assertEquals(
    countMatches([1, 2, 3], (x) => x >= 0),
    3
  )
  assertEquals(
    countMatches([-1, 2, -3], (x) => x < 0),
    2
  )
  assertEquals(
    countMatches([], (x) => x < 0),
    0
  )

  assertEquals(
    // @ts-ignore
    countMatches(["a", "", "b"], (x) => x.length > 0),
    2
  )
  assertEquals(
    // @ts-ignore
    countMatches(["a", "", "b"], (x) => x.length === 0),
    1
  )
})

/**
  Use Array.prototype.reduce()
  You can mutate (change) the current state in the callback 
  (but you can also solve this exercise without doing so)
*/

const filter = (arr: any[], callback: (...args: any[]) => boolean) => {
  return arr.reduce((result, curr, index) => {
    if (callback(curr, index, arr)) {
      result.push(curr)
    }
    return result
  }, [])
}

Deno.test("filter", () => {
  assertEquals(
    filter([], () => true),
    []
  )
  assertEquals(
    filter([], () => false),
    []
  )
  assertEquals(
    filter(["a", "b", "c", "d"], () => true),
    ["a", "b", "c", "d"]
  )
  assertEquals(
    filter(["a", "b", "c", "d"], () => false),
    []
  )
  assertEquals(
    filter([3, -4, 5, 0], (x) => x > 0),
    [3, 5]
  )
  assertEquals(
    filter(["a", "b", "c", "d"], (x, i) => i % 2 === 0),
    ["a", "c"]
  )
})
