import "@testing-library/jest-dom/extend-expect";
import { NextApiResponse } from "next";
import { MockResponse } from "node-mocks-http";

interface ExpectedResponse<T = {}> {
  status: number;
  body: T;
}

expect.extend({
  toRespond: <T>(
    actual: MockResponse<NextApiResponse<T>>,
    expected: ExpectedResponse<T>
  ) => {
    const status = actual._getStatusCode() === expected.status;
    if (!status) {
      return {
        pass: false,
        message: () =>
          `Status ${actual._getStatusCode()} ${status ? "!=" : "=="} ${
            expected.status
          }`,
      };
    }

    expect(actual._getJSONData()).toEqual(expected.body);

    return { pass: true, message: () => `Responses are equivalent` };
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toRespond<T>(expected: ExpectedResponse<T>): R;
    }
  }
}
