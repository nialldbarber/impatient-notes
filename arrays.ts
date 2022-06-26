import { assertEquals } from "https://deno.land/std@0.145.0/testing/asserts.ts"

/**
  Use Array.prototype.flatMap()
  Use Number() to convert arbitrary values to numbers.
 */
const convertToNumbers = (arr: any[]) =>
  arr
    .flatMap((currentValue) => Number(currentValue))
    .filter((item) => !isNaN(item))

Deno.test("convertToNumbers() via flatMap()", () => {
  assertEquals(
    convertToNumbers(["", "1", "2", "abc", "3"]),
    [0, 1, 2, 3]
  )
  assertEquals(convertToNumbers([4, 5, NaN, 6, NaN, 7]), [4, 5, 6, 7])
  assertEquals(
    convertToNumbers([false, true, null, undefined]),
    [0, 1, 0]
  )
})

/**
  Use Array.prototype.reduce()
 */
const countMatches = (
  arr: any[],
  callbackFn: (num: any) => boolean
) =>
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
    countMatches(["a", "", "b"], (x) => x.length > 0),
    2
  )
  assertEquals(
    countMatches(["a", "", "b"], (x) => x.length === 0),
    1
  )
})

/**
  Use Array.prototype.reduce()
 */
const filter = (
  arr: any[],
  callback: (...args: any[]) => boolean
) => {
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

/**
  Use Array.prototype.reduce() to implement map_via_reduce.mjs
 */
const map = (
  arr: any[],
  callback: (...args: any[]) => number | string
) => {
  return arr.reduce(
    (prev, curr, index) => [...prev, callback(curr, index)],
    []
  )
}

Deno.test("map() via .reduce()", () => {
  assertEquals(
    map([1, 2, 3], (x) => x * 2),
    [2, 4, 6]
  )
  assertEquals(
    map([1, 2, 3], (x) => "a"),
    ["a", "a", "a"]
  )
  assertEquals(
    map(["a", "b", "c"], (x, i) => i),
    [0, 1, 2]
  )
  assertEquals(
    map(["a", "b", "c"], (x) => x),
    ["a", "b", "c"]
  )
  assertEquals(
    map([], (x) => x),
    []
  )
})

/**
  Use the Array method .map()
 */
const padNumber = (num: number) =>
  num.toString().length === 1 ? `0${num}` : num

const numberLines = (lines: string[]) =>
  lines.map((line, index) => `${padNumber(index + 1)}: ${line}`)

Deno.test("numberLines", () => {
  const lines = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
  const numbered = [
    "01: a",
    "02: b",
    "03: c",
    "04: d",
    "05: e",
    "06: f",
    "07: g",
    "08: h",
    "09: i",
    "10: j",
  ]
  assertEquals(numberLines(lines), numbered)
})
