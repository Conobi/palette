// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    { path: '~/components/general', pathPrefix: false },
    { path: '~/components', pathPrefix: true }
  ],
  future: {
    compatibilityVersion: 4
  },
  runtimeConfig: {
    public: {
      date: new Date().toLocaleDateString('en-US')
    }
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    // '@nuxtjs/fontaine',
    // '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss'
  ],
  ui: {
    global: true,
    icons: ['tabler', 'simple-icons']
  },
  imports: {
    dirs: ['composables', 'composables/types']
  },
  extends: ['@nuxt/ui-pro'],
  compatibilityDate: '2024-07-06'
})
