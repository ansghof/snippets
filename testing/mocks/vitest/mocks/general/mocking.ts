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
