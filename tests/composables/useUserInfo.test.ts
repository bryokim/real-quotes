// @vitest-environment nuxt
import { useUserInfo, Roles } from "../../composables/useUserInfo";

describe("useUserInfo tests", () => {
  test("default value is null", () => {
    const userInfo = useUserInfo();
    expect(userInfo.value).toBeNull();
  });
});
