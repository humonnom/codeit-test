import delay from "./delay";

describe("delay", () => {
  // 1-1.setTimeout 활용
  it("should delay `func` execution", (done) => {
    let pass = false;
    delay(() => {
      pass = true;
    }, 32);

    setTimeout(() => {
      expect(pass).toBe(false);
    }, 1);

    setTimeout(() => {
      expect(pass).toBe(true);
      done();
    }, 64);
  });

  // 1-2.mock 함수 활용
  it("should delay `func` execution - mock fn", (done) => {
    const mockCallback = jest.fn();

    delay(mockCallback, 32);

    setTimeout(() => {
      // 32ms 이전에는 콜백 함수가 호출되지 않아야 합니다.
      expect(mockCallback).not.toHaveBeenCalled();
    }, 1);

    setTimeout(() => {
      // 64ms 후에는 콜백 함수가 호출되어야 합니다.
      expect(mockCallback).toHaveBeenCalled();
      done();
    }, 64);
  });

  // 1-3. jest fake timer 활용
  it("should delay `func` execution - jest fake timer", () => {
    jest.useFakeTimers();
    const mockCallback = jest.fn();

    delay(mockCallback, 32);

    // 32ms 이전에는 콜백 함수가 호출되지 않아야 합니다.
    jest.advanceTimersByTime(1);
    expect(mockCallback).not.toHaveBeenCalled();

    // 64ms 후에는 콜백 함수가 호출되어야 합니다.
    jest.advanceTimersByTime(64);
    expect(mockCallback).toHaveBeenCalled();

    jest.useRealTimers(); // 실제시간 사용 (초기화)
  });

  // 2.
  it("should use a default `wait` of `0`", (done) => {
    let pass = false;
    delay(() => {
      pass = true;
    });

    expect(pass).toBe(false);

    setTimeout(() => {
      expect(pass).toBe(true);
      done();
    }, 0);
  });

  // 3.
  it("should be cancelable", (done) => {
    let pass = true;
    const timerId = delay(() => {
      pass = false;
    }, 32);

    clearTimeout(timerId);

    setTimeout(() => {
      expect(pass).toBe(true);
      done();
    }, 64);
  });

  // 4.
  it("should provide additional arguments to `func`", (done) => {
    const mockFn = jest.fn();

    delay(mockFn, 32, 1, 2);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledWith(1, 2);
      done();
    }, 64);
  });
});
