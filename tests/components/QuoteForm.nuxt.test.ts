import QuoteForm from '~/components/QuoteForm.vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';

describe('QuoteForm tests', () => {
  test('can be mounted', async () => {
    const component = await mountSuspended(QuoteForm, {
      props: { title: 'Test Create', quote: 'Test Quote', action: 'Create' },
    });

    expect(component.find('h1').text()).toBe('Test Create');
    expect(component.find('button').text()).toBe('Create');
    expect(component.find('textarea').text()).toBe('');

    component.unmount();
  });
});
