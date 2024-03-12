// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $development: {
    devtools: { enabled: true },
  },
  $production: {
    // production configuration
  },
  modules: ["@nuxtjs/google-fonts", "@nuxt/ui", "@nuxtjs/supabase"],

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/"],
      cookieRedirect: true,
    },
  },

  googleFonts: {
    families: {
      "Josefin+Sans": true,
      Lato: [99, 300],
      "Crimson Pro": {
        wght: "199..900",
        ital: "199..700",
      },
    },
  },

  ui: {
    icons: ["fluent", "fluent-emoji", "bi"],
  },

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon-color.svg" },
      ],
    },
  },
});
