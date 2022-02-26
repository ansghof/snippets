// WHEN TO USE: When trying to test functionality that only affects one browser
// IMPORTANT PARTS:
// flushQueue: true
// put the mock after the page creation because the page will create a mock window with mock navigator
// await page.waitForChanges(); - then everything will be executed.

/**
 * Need to rerender the page several times with different configs
 * @returns new stencil spec page
 */
function renderPage(options = {}) {
  return newSpecPage({
    components: [MyComponent],
    template: () => <my-component />,
    ...options,
  });
}

describe("test suite", () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it("test that uses local or session storage", async () => {
    const page = await renderPage({ flushQueue: false }); // flushQueue prevents lifecycle hooks from being executed before we changed the storage
    // mock userAgent (has to go after the page was created but before lifecylce hooks are run because we need the mock to be ready during their execution
    // userAgent is a readonly property of navigator so this way can be used to mock other readonly properties as well
    Object.defineProperty(page.win.navigator, "userAgent", {
      get: () =>
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
    });
    await page.waitForChanges();
    // expect something
  });
});
