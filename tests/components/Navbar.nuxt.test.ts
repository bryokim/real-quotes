import Navbar from "~/components/Navbar.vue";
import { mountSuspended, mockNuxtImport } from "@nuxt/test-utils/runtime";

const { useSupabaseUserMock } = vi.hoisted(() => {
  return {
    useSupabaseUserMock: vi.fn().mockImplementation(() => {
      return { value: "user" };
    }),
  };
});

mockNuxtImport("useSupabaseUser", () => {
  return useSupabaseUserMock;
});

describe("Navbar tests", () => {
  afterEach(() => {
    useSupabaseUserMock.mockRestore();
  });

  test("can be mounted", async () => {
    const wrapper = await mountSuspended(Navbar);
    expect(wrapper.text().includes('RealQuotes')).toBeTruthy();
  });

  test("sign out button is not displayed if not signed in", async () => {
    useSupabaseUserMock.mockImplementation(() => {
      return { value: false };
    });

    const wrapper = await mountSuspended(Navbar);
    expect(wrapper.text().includes('sign out')).toBeFalsy;
  });

  test("sign out button displayed if signed in", async () => {
    useSupabaseUserMock.mockImplementation(() => {
      return { value: true };
    });

    const wrapper = await mountSuspended(Navbar);
    expect(wrapper.text().includes("sign out")).toBeTruthy();
  });
});
