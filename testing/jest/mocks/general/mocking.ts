// 1. without any import before, directly mock the packages one method and let it return the desired object
jest.mock("@ansghof/my-service", () => ({
  getData: jest.fn(() =>
    Promise.resolve({
      id: "asdf1234",
      given_name: "Ansgar",
      family_name: "Hoffmann",
      user_type: "tester",
      email: "test@test.io",
    })
  ),
}));

// 2. as jest.Mock
// import method from package,
// assign it as jest.Mock to a constant.
// use .mockResolvedValue() to set a mock return value
import { getConfig } from "@ansghof/my-service";

const getConfigMock = getConfig as jest.Mock;

beforeEach(async () => {
  jest.clearAllMocks();
});

it("should make getConfigMock return config", async () => {
  getConfigMock.mockResolvedValueOnce(config);
  // confinue with test
});

// 3. as jest.mock with factory
const mockMyFunction = jest.fn();
jest.mock('@ansghof/my-service', () => ({
  myFunction: () => mockMyFunction,
}));

it("should make getConfigMock return config", async () => {
  mockMyFunction.mockResolvedValueOnce(result);
  // confinue with test
});
