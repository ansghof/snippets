// WHEN TO USE: When trying to test functionality related to localStorage or sessionStorage
// IMPORTANT PARTS:
// flushQueue: true -
// put your storage actions inbetween
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
    page.win.sessionStorage.setItem("storage-item", "true"); // interact with storage between render and waitForChanges
    await page.waitForChanges(); // will execute the stuff and storage will have its state as we have set it
    expect(myMock).toHaveBeenCalledTimes(0); // continue with the test....
  });
});
