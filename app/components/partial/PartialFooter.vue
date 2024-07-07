<template>
  <UFooter
    class="text-lg px-8 pt-4 opacity-60 hover:opacity-100 transition-all"
  >
    <template #left>
      © {{ new Date().getFullYear() }} - Théo Montagnon
    </template>
    <template #center>
      <span class="text-sm">· Updated on {{ $config.public.date }} ·</span>
    </template>
    <template #right>
      <UButton
        icon="i-simple-icons-linkedin"
        color="gray"
        variant="ghost"
        to="https://www.linkedin.com/in/theomontagnon/"
        target="_blank"
      >
        <span class="hidden">Linkedin</span>
      </UButton>
      <UButton
        icon="i-simple-icons-github"
        color="gray"
        variant="ghost"
        to="https://github.com/Conobi"
        target="_blank"
      >
        <span class="hidden">GitHub</span>
      </UButton>
    </template>
  </UFooter>
</template>

<script lang="ts" setup></script>

<style></style>
