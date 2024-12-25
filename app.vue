<template>
  <NuxtPage :page-key="route => route.fullPath" />
</template>

<script setup>
import { useNotesStore } from '~/stores/notes';

const store = useNotesStore();
store.initStore();
</script>
