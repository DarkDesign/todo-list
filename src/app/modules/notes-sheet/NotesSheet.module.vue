<template>

    <div
        class="notes">

        <div
            class="notes-header">

            <div
                class="header-title">

                <material-icon
                    name="notes"></material-icon>

                <p>Заметки: {{ notes.length }}</p>

            </div>

            <div
                class="header-add">

               <button
                   @click="createNotes()">

                   <material-icon
                       name="note_add"></material-icon>

                   <span
                       class="btn-text">Создать</span>

               </button>

            </div>

        </div>

        <div
            class="notes-list">

            <template
                v-if="notes.length !== 0">

                <simple-note
                    v-for="note of notes"
                    :key="note.id"
                    :note="note"
                    @delete="deleteNoteById($event)"></simple-note>

            </template>

            <template
                v-else>

                <p
                    class="notes-empty">заметок нет..</p>

            </template>

        </div>

    </div>

</template>

<script lang="ts">
import NoteComponent from '@/app/modules/notes-sheet/components/note/Note.component.vue';
import IconComponent from '@/app/root-components/icons/material/Icon.component.vue';
import { Note, INote } from '@/models';
import { LocalStorageService } from '@/services';
import { Component, Vue, Watch } from 'vue-property-decorator';



@Component({
    components: {
        'simple-note': NoteComponent,
        'material-icon': IconComponent,
    },
})
export default class NotesSheetModule extends Vue {

    public readonly localStorageService: LocalStorageService<
        INote[]
    > = new LocalStorageService<INote[]>();

    public notes: Note[] = [];

    public createNotes(): void {
        this.notes.unshift(
            new Note(
                Date.now(),
                Date.now()
            )
        );
    }

    public deleteNoteById(id: number): void {
        this.notes = this.notes.filter(
            note => note.id !== id
        );
    }

    @Watch('notes', {deep: true})
    private save(): void {
        this.localStorageService.save(
            'notes',
            this.notes.map(
                note => note.toData()
            )
        );
    }

    // -- Lifecycle hooks

    public created(): void {
        const notesData = this.localStorageService.load('notes');
        if(!!notesData) this.notes = notesData.map(nd => Note.fromData(nd));
    }

}
</script>


<style scoped lang="scss">

.notes {
    @apply
        w-full
        max-w-2xl
        m-auto
        mt-10
        bg-white
        rounded-lg
        shadow;

    &-header {
        @apply
            p-2.5
            flex
            justify-between
            items-center;

        .header {
            &-title {
                @apply
                    flex
                    gap-2.5;

                p {
                    @apply
                        font-light
                        text-gray-600;
                }
            }

            &-add {
                button {
                    @apply
                        flex
                        items-center
                        p-1
                        bg-gray-50
                        hover:bg-indigo-200
                        focus:ring-purple-500
                        focus:ring-offset-purple-200
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        ease-in
                        duration-200
                        rounded-lg;

                    .btn-text {
                        @apply
                            pl-2
                            uppercase
                            text-gray-600
                            font-light;
                    }
                }
            }
        }
    }

    &-list {
        @apply p-5;
    }


    &-empty {
        @apply
            font-light
            text-gray-300
            text-center
            m-5;
    }

    .note + .note {
        @apply
            border-t
            border-gray-300
            mt-4
            pt-4;
    }
}

</style>