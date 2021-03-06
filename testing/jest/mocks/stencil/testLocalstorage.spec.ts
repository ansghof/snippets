// WHEN TO USE: When trying to test functionality related to localStorage or sessionStorage

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
    page.win.sessionStorage.setItem("storage-item", "true"); // interact with storage before lifecycle hooks are executed so that the data is ready then.
    await page.waitForChanges(); // will execute the stuff and storage will have its state as we have set it
    // continue with the test, expect something.
  });
});
