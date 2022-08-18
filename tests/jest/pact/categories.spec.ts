import { Matchers, Pact } from "@pact-foundation/pact";
import { fetchNavigation } from "../../../utils/fetcher";

const { extractPayload, like } = Matchers;

const mockSearchProvider = new Pact({
  consumer: "my_frontend",
  provider: "search-service",
  host: "localhost",
  port: 9998,
  logLevel: "debug",
});

jest.mock("next/config", () => ({
  __esModule: true,
  default: () => ({
    serverRuntimeConfig: {
      searchServiceBaseUrl: "http://localhost:9998",
    },
  }),
}));

const acceptJson = "application/json";
const headers = {
  Accept: acceptJson,
};

describe("Categories API Pact test", () => {
  beforeAll(() => mockSearchProvider.setup());
  afterEach(() => mockSearchProvider.verify());
  afterAll(() => mockSearchProvider.finalize());

  describe("get categories", () => {
    test("fetch all categories for navigation", async () => {
      const categoriesExpectation = like([]);
      await mockSearchProvider.addInteraction({
        state: "all categories",
        uponReceiving: "a request to get categories",
        withRequest: {
          method: "GET",
          path: "/categories",
          headers: headers,
        },
        willRespondWith: {
          status: 200,
          body: categoriesExpectation,
        },
      });

      const category = await fetchNavigation("de_DE");

      expect(category).toStrictEqual(extractPayload(categoriesExpectation));
    });
  });
});
