import { useQuotes, useQuotesClient } from '~/composables/useQuotes';

const mockQuote = {
  id: '123',
  quote: 'Test quote',
  author: 'Test guy',
};

describe('useQuotesClient tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('useSupabaseClient is called only the first time when accessing quotes', async () => {
    const quotes = useQuotes();
    expect(quotes.value).toBeNull();

    const fromSpy = vi
      .spyOn(useSupabaseClient(), 'from')
      // @ts-ignore
      .mockImplementation(() => {
        return {
          select: (columns: string) => {
            return {
              data: [mockQuote],
            };
          },
        };
      });

    const { getQuotes } = useQuotesClient();

    await getQuotes();
    expect(quotes.value?.length).toBe(1);
    expect(quotes.value).toEqual([mockQuote]);

    // Call again. useSupabaseClient should not be called this time.
    await getQuotes();
    expect(quotes.value?.length).toBe(1);
    expect(fromSpy).toHaveBeenCalledOnce();
  });
});
