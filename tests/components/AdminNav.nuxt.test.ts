import AdminNav from '~/components/AdminNav.vue';
import { Roles } from '~/composables/useUserInfo';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';

const { useUserInfoMock } = vi.hoisted(() => {
  return {
    useUserInfoMock: vi.fn().mockImplementation(() => {
      return { value: { role: Roles.read } };
    }),
  };
});

mockNuxtImport('useUserInfo', () => {
  return useUserInfoMock;
});

describe('AdminNav tests', () => {
  afterEach(() => {
    useUserInfoMock.mockRestore();
  });

  test('only home link is shown for read role', async () => {
    const component = await mountSuspended(AdminNav);
    expect(component.text().includes('Home')).toBeTruthy();
    component.unmount();
  });

  test('create and update links are shown for write role', async () => {
    useUserInfoMock.mockImplementation(() => {
      return { value: { role: Roles.write } };
    });

    const component = await mountSuspended(AdminNav);
    expect(component.text().includes('Create')).toBeTruthy();
    expect(component.text().includes('Update')).toBeTruthy();

    component.unmount();
  });

  test('create, update and delete links are shown for admin role', async () => {
    useUserInfoMock.mockImplementation(() => {
      return { value: { role: Roles.admin } };
    });

    const component = await mountSuspended(AdminNav);
    expect(component.text().includes('Create')).toBeTruthy();
    expect(component.text().includes('Update')).toBeTruthy();
    expect(component.text().includes('Delete')).toBeTruthy();

    component.unmount();
  });

  test('create, update, delete and admins links are shown for superuser role', async () => {
    useUserInfoMock.mockImplementation(() => {
      return { value: { role: Roles.superuser } };
    });

    const component = await mountSuspended(AdminNav);
    expect(component.text().includes('Create')).toBeTruthy();
    expect(component.text().includes('Update')).toBeTruthy();
    expect(component.text().includes('Delete')).toBeTruthy();
    expect(component.text().includes('Admins')).toBeTruthy();

    component.unmount();
  });

  test('create, update, delete and admins links are shown for root role', async () => {
    useUserInfoMock.mockImplementation(() => {
      return { value: { role: Roles.root } };
    });

    const component = await mountSuspended(AdminNav);
    expect(component.text().includes('Create')).toBeTruthy();
    expect(component.text().includes('Update')).toBeTruthy();
    expect(component.text().includes('Delete')).toBeTruthy();
    expect(component.text().includes('Admins')).toBeTruthy();

    component.unmount();
  });
});
