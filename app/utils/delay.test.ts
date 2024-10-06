import delay from "./delay";

describe("delay", () => {
  // setTimeout 활용
  it("should delay `func` execution", (done) => {
    let pass = false;
    delay(() => {
      pass = true;
    }, 32);

    setTimeout(() => {
      expect(pass).toBe(false);
    }, 1);

    setTimeout(() => {
      expect(pass);
      done();
    }, 64);
  });

  // mock 함수 활용
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

  it("should use a default `wait` of `0`", (done) => {
    let pass = false;
    delay(() => {
      pass = true;
    });

    expect(pass).toBe(false);

    setTimeout(() => {
      expect(pass);
      done();
    }, 0);
  });

  it("should be cancelable", (done) => {
    let pass = true;
    const timerId = delay(() => {
      pass = false;
    }, 32);

    clearTimeout(timerId);

    setTimeout(() => {
      expect(pass);
      done();
    }, 64);
  });

  it("should provide additional arguments to `func`", (done) => {
    const mockFn = jest.fn();

    delay(mockFn, 32, 1, 2);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledWith(1, 2);
      done();
    }, 64);
  });
});
