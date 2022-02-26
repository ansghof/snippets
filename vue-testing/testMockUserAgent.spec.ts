// this method of mocking works fine with vue, but doesn't with Stenciljs.
import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";

// userAgent is a readonly property of navigator so this way can be used to mock other readonly properties as well
jest
  .spyOn(window.navigator, "userAgent", "get")
  .mockReturnValueOnce(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0"
  );

let wrapper = mount(MyPage);
let groupsPageVM = wrapper.vm as IMyPage;

beforeAll(async () => {
  await flushPromises();
});

afterAll(() => {
  jest.resetAllMocks();
});



// in the tested class, this will result in window.navigator.userAgent returning the desired string.
// MyPage.vue:
async mounted(): Promise<void> {
    this.currentUser = (await getProfile()).sub;
    this.userAgent = window.navigator.userAgent.toLowerCase();
}