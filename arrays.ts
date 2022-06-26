import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.145.0/testing/asserts.ts"

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

/**
	Implement the class Queue via an Array
 */
class Queue {
  items: string[]
  constructor() {
    this.items = []
  }
  enq(item: string) {
    this.items = [...this.items, item]
  }
  deq() {
    if (this.items.length === 0) {
      throw new Error("Queue is empty")
    }
    return this.items.shift()
  }
  get length() {
    return this.items.length
  }
}

Deno.test("Using a queue", () => {
  const queue = new Queue()
  assertEquals(queue.length, 0)

  queue.enq("a")
  queue.enq("b")
  assertEquals(queue.length, 2)

  assertEquals(queue.deq(), "a")
  assertEquals(queue.deq(), "b")
  assertEquals(queue.length, 0)
  // @ts-ignore
  assertThrows(() => queue.deq(), { message: "Queue is empty" })
})

Deno.test("Queue must not be a subclass of Array", () => {
  const queue = new Queue()
  assertEquals(queue instanceof Array, false)
})

/**
	Use Array.prototype.filter
 */
const removeEmptyLinesViaFilter = (arr: string[]) =>
  arr.filter((item) => item !== "")

Deno.test("removeEmptyLinesViaFilter() via .filter()", () => {
  assertEquals(
    removeEmptyLinesViaFilter(["", "a", "b", "", "", "c", "d", ""]),
    ["a", "b", "c", "d"]
  )
  assertEquals(removeEmptyLinesViaFilter([]), [])
  assertEquals(removeEmptyLinesViaFilter(["a"]), ["a"])
  assertEquals(removeEmptyLinesViaFilter(["a", "b"]), ["a", "b"])
  assertEquals(removeEmptyLinesViaFilter([""]), [])
  assertEquals(removeEmptyLinesViaFilter(["", "a", ""]), ["a"])
})

/**
– Use a for-of loop and Array.prototype.push
*/
const removeEmptyLinesViaPush = (arr: string[]) => {
  const items = []
  for (const item of arr) {
    if (item !== "") items.push(item)
  }
  return items
}

Deno.test("removeEmptyLinesViaPush() via .push()", () => {
  assertEquals(
    removeEmptyLinesViaPush(["", "a", "b", "", "", "c", "d", ""]),
    ["a", "b", "c", "d"]
  )
  assertEquals(removeEmptyLinesViaPush([]), [])
  assertEquals(removeEmptyLinesViaPush(["a"]), ["a"])
  assertEquals(removeEmptyLinesViaPush(["a", "b"]), ["a", "b"])
  assertEquals(removeEmptyLinesViaPush([""]), [])
  assertEquals(removeEmptyLinesViaPush(["", "a", ""]), ["a"])
})

/**
	Sort the test below via .sort()
 */
const sortObjectsByName = <T extends { name: string }>(arr: T[]) =>
  arr.sort((a: T, b: T) => a.name.localeCompare(b.name))

Deno.test("sortObjectsByName", () => {
  assertEquals(
    sortObjectsByName([
      { name: "C" },
      { name: "b" },
      { name: "Ä" },
      { name: "d" },
    ]),
    [{ name: "Ä" }, { name: "b" }, { name: "C" }, { name: "d" }]
  )
})
