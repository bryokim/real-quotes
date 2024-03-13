interface QuoteObject {
  id: string;
  quote: string;
  author?: string;
  description?: string;
}

export const useQuotes = () => {
  return useState<QuoteObject[] | null>("quotes", () => null);
};

export const useQuotesClient = () => {
  const supabase = useSupabaseClient();
  const allQuotes = useQuotes();

  const getQuotes = async () => {
    if (!allQuotes.value) {
      const { data: quotes } = await supabase
        .from("quotes")
        .select("id, quote, author");
      allQuotes.value = quotes;
    }
  };

  return {
    getQuotes,
  };
};
