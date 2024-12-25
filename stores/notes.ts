import {defineStore} from 'pinia';

export const useNotesStore = defineStore('notes', {
    state: () => ({
        notes: [] as Note[],
        lastNotes: [] as Note[]
    }),
    actions: {
        initStore() {
            if (process.client) {
                const savedNotes = localStorage.getItem('notes');
                const oldNotes = localStorage.getItem('last_notes');
                if (savedNotes) {
                    this.notes = JSON.parse(savedNotes);
                }
                if (oldNotes) {
                    this.lastNotes = JSON.parse(oldNotes);
                }
            }
        },
        addNote(note: Note) {
            this.notes.push(note);
            this.saveToStorage();
        },
        updateNote(updatedNote: Note) {
            const index = this.notes.findIndex((note) => note.id === updatedNote.id);
            if (index !== -1) this.notes[index] = updatedNote;
            this.saveToStorage();
        },
        deleteNote(id: string) {
            this.notes = this.notes.filter((note) => note.id !== id);
            this.saveToStorage();
        },
        cancelChanges() {
            this.notes = this.lastNotes
            this.saveToStorage()
        },
        saveToStorage() {
            if (process.client) {
                this.lastNotes = this.notes
                localStorage.setItem('notes', JSON.stringify(this.notes));
                localStorage.setItem('last_notes', JSON.stringify(this.lastNotes));
            }
        }
    },
})

interface Note {
    id: number | string;
    title: string;
    todos: Todo[];
}

interface Todo {
    text: string;
    completed: boolean;
}
