import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "hooks//useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  test("returns the updated value after the delay", () => {
    const { result, rerender } = renderHook(
      (props) => useDebounce(props.value, props.delay),
      {
        initialProps: {
          value: "initial",
          delay: 500,
        },
      }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated", delay: 500 });

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(result.current).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe("updated");
  });

  test("cleans up the timer on unmount", () => {
    const { unmount } = renderHook(() => useDebounce("initial", 500));

    unmount();

    expect(jest.getTimerCount()).toBe(0);
  });
});
