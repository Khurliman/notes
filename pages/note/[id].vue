<template>
  <div class="page">
    <label for="note-name" class="note-name">
      Название заметки
      <textarea v-model="note.title" placeholder="Название заметки" rows="4" class="note-textarea" />
    </label>
    <ul v-if="note.todos?.length" class="note-todo__list">
      <li
          v-for="(todo, index) in note.todos"
          :key="index"
          class="note-todo__item"
      >
        <label class="note__checkbox">
          <input v-model="todo.completed" type="checkbox" />
          <span class="note__checkbox-custom"></span>
        </label>
        <input v-model="todo.text" placeholder="Todo Text" class="note-todo__input" />
        <button class="btn btn-md btn-white" @click="removeTodo(index)">
          Удалить
        </button>
      </li>
    </ul>
    <div class="note__btns">
      <button class="btn btn-white" @click="addTodo">
        Добавить пункт
      </button>
      <div class="note__btns-main">
        <button class="btn btn-dark" @click="cancelChanges">
          Отменить
        </button>
        <button class="btn btn-blue" @click="saveNote">
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNotesStore } from '~/stores/notes';
import { useRoute, useRouter } from 'vue-router';

const store = useNotesStore();
const route = useRoute();
const router = useRouter();

const noteId = route.params.id;
const note = {...store.notes.find((n) => n.id === noteId) || { title: '', todos: [] }}

function addTodo () {
  note.todos.push({ text: '', completed: false });
}

function removeTodo (index) {
  note.todos.splice(index, 1);
}

function saveNote () {
  if (note.title) {
    const filtered_todos = note.todos.filter(item => item.text)
    store.updateNote({
      ...note,
      todos: filtered_todos
    });
    router.push('/');
  } else {
    alert('Введите название заметки')
  }
}

function cancelChanges () {
  console.log('note', note)
  if (confirm('Отменить изменения?')) {
    store.cancelChanges()
    router.push('/');
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.note-name {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  font-size: 18px;
}

.note-textarea {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  resize: none;
}

.note-todo__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.note-todo__item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-todo__input {
  height: 28px;
  min-width: 300px;
  max-width: calc(100% - 80px);
  padding: 4px;
}

.note__btns {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

.note__btns-main {
  display: flex;
  gap: 12px;
}

@media (max-width: 768px) {
  .note-todo__input {
    min-width: auto;
  }
}
</style>
