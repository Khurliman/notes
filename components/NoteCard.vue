<template>
  <div class="note__card">
    <h3 class="note__card-title">{{ note.title }}</h3>
    <ul
        v-if="note.todos?.length"
        class="note__card-todos"
    >
      <li
          v-for="(todo, index) in note.todos.slice(0, 3)"
          :key="index"
          class="note__card-todo"
      >
        - {{ todo.text }}
      </li>
      <li
          v-if="note.todos?.length > 3"
          class="note__card-todo"
      >
        ...
      </li>
    </ul>
    <div class="note__card-btns">
      <button
          class="btn btn-md btn-white"
          @click="$emit('edit')"
      >
        Изменить
      </button>
      <button
          class="btn btn-md btn-dark"
          @click="$emit('delete')"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  note: {
    type: Object,
    default: () => ({})
  }
});

</script>

<style scoped>
.note__card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 12px;
}

.note__card-title {
  font-size: 20px;
  font-weight: 600;
}

.note__card-todos {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}

.note__card-btns {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}
</style>
