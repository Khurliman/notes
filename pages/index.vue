<template>
  <div class="page">
    <div class="notes-top">
      <h1>Заметки</h1>
      <button
          class="btn btn-blue"
          @click="createNote"
      >
        Создать
      </button>
    </div>
    <div class="notes-list">
      <NoteCard
          v-for="note in notes"
          :key="note.id"
          :note="note"
          @edit="editNote(note.id)"
          @delete="deleteNote(note.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { useNotesStore } from '~/stores/notes';
import NoteCard from '~/components/NoteCard.vue';
import { useRouter } from 'vue-router';

const store = useNotesStore();
const router = useRouter();

const notes = computed(() => {
  return store.notes
})

function createNote () {
  const id = crypto.randomUUID();
  store.addNote({ id, title: 'Заметка', todos: [] });
  router.push(`/note/${id}`);
}

function editNote (id) {
  router.push(`/note/${id}`);
}

function deleteNote (id) {
  if (confirm('Удалить заметку?')) {
    store.deleteNote(id);
  }
}
</script>

<style scoped>
.notes-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.notes-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
