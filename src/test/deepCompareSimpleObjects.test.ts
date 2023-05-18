import { deepCompareSimpleObjects } from "utils";

describe("deepCompareSimpleObjects", () => {
  it("should return true for equal objects", () => {
    const obj1 = {
      name: "John",
      age: 30,
      address: { city: "New York", country: "USA" },
    };
    const obj2 = {
      name: "John",
      age: 30,
      address: { city: "New York", country: "USA" },
    };
    expect(deepCompareSimpleObjects(obj1, obj2)).toBe(true);
  });

  it("should return false for different objects", () => {
    const obj1 = {
      name: "John",
      age: 30,
      address: { city: "New York", country: "USA" },
    };
    const obj2 = {
      name: "Jane",
      age: 25,
      address: { city: "London", country: "UK" },
    };
    expect(deepCompareSimpleObjects(obj1, obj2)).toBe(false);
  });

  it("should handle null and undefined values", () => {
    const obj1 = { name: "John", age: null };
    const obj2 = { name: "John", age: undefined };
    expect(deepCompareSimpleObjects(obj1, obj2)).toBe(false);

    const obj3 = { name: "John", address: null };
    const obj4 = { name: "John" };
    expect(deepCompareSimpleObjects(obj3, obj4)).toBe(false);
  });
});
