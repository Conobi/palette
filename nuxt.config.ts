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
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  extends: ['@nuxt/ui-pro'],
  compatibilityDate: '2024-07-06'
})
