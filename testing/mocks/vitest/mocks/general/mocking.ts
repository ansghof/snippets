import * as myService from '@xxx/myservice';
afterEach(() => {
  vi.restoreAllMocks();
});

it('should do ...', async () => {
    const nameSpy = vi.spyOn(myService, 'getName');
    nameSpy.mockResolvedValueOnce(mockUsername);

    const wrapper = mount(MyComponent, {
      props: {
      },
    });
    // needs to be there:
    await flushPromises();
    
    expect(nameSpy).toHaveBeenCalledTimes(1);
    const nameElement = wrapper.find('blabla');
    expect(nameElement.text()).equals(fullName);
}

// mock ResizeObserver (or other global stuff)
const resizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', resizeObserverMock);
