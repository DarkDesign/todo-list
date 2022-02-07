<template>

    <div
        class="note"
        @click="focusin()">

        <div
            class="note-header">
            <div
                class="note-actions"
                v-if="actionTypes === Action.Edit">

                <button
                    @click="note.prevState();"
                    :disabled="!note.isPrev">

                    <material-icon
                        name="undo"></material-icon>

                </button>

                <button
                    @click="note.nextState();"
                    :disabled="!note.isNext">

                    <material-icon
                        name="redo"></material-icon>

                </button>

                <button
                    @click="deleteNotes()">

                    <material-icon
                        name="delete"></material-icon>

                </button>

            </div>

            <color-select
                v-if="actionTypes === Action.Edit"
                v-model="note.color"></color-select>

        </div>

        <div
            class="note-body">

            <text-area
                ref="textarea"
                v-if="actionTypes === Action.Edit"
                v-model="note.text"
                :color="note.color"></text-area>

            <div
                class="markdown"
                :class="note.color"
                v-if="actionTypes === Action.None">

                <markdown-area
                    :content="note.text">

                    <div
                        class="note-empty">Пустая заметка</div>

                </markdown-area>

            </div>

            <time-formatter
                :date="note.date"></time-formatter>

        </div>

    </div>

</template>

<script lang="ts">
import ColorSelectComponents from '@/app/root-components/color-select/ColorSelect.components.vue';
import DateComponent from '@/app/root-components/date/Date.component.vue';
import IconComponent from '@/app/root-components/icons/material/Icon.component.vue';
import MarkdownAreaComponent from '@/app/root-components/markdown-area/MarkdownArea.component.vue';
import TextareaComponent from '@/app/root-components/textarea/Textarea.component.vue';
import { Action } from '@/core/types';
import { Note } from '@/models/note/Note';
import { Component, Prop, Vue, Ref, Emit } from 'vue-property-decorator';


@Component({
    components: {
        'material-icon': IconComponent,
        'color-select': ColorSelectComponents,
        'text-area': TextareaComponent,
        'markdown-area': MarkdownAreaComponent,
        'time-formatter': DateComponent,
    },
})
export default class NoteComponent extends Vue {


    @Prop({required: true})
    public readonly note!: Note;

    @Ref('textarea')
    private $textareaRef!: HTMLInputElement;

    @Emit('delete')
    public deleteNotes(): number {
        return this.note.id;
    }



    public Action = Action;
    public actionTypes: Action = Action.None;

    public focusin(): void {
        this.actionTypes = this.Action.Edit;
        this.$nextTick(() => {
            if(!this.$textareaRef) return;

            this.$textareaRef.focus();
            this.createListenerClickOutside();
        });
    }

    public focusout(): void {

        this.actionTypes = this.Action.None;
        this.removeListenerClickOutside();

    }

    private onClickOutside(event: MouseEvent): void {
        if (event.target instanceof Element) {
            if (
                !this.$el.contains(event.target)
                && this.actionTypes === this.Action.Edit
            ) this.focusout();
        }
    }

    private createListenerClickOutside(): void {

        document.addEventListener('mousedown', this.onClickOutside);

    }

    private removeListenerClickOutside(): void {

        document.removeEventListener('mousedown', this.onClickOutside);

    }


    // -- Lifecycle hooks

    public destroyed(): void {

        this.removeListenerClickOutside();

    }

}

</script>

<style scoped lang="scss">

.note {

    &-header {
        @apply
            gap-2.5
            mb-2
            flex
            justify-between;

    }

    &-actions {
        @apply
            flex
            gap-2.5
            mb-2;

        button {
            @apply
                flex
                content-center
                hover:bg-indigo-200
                rounded-full
                p-1;

            &:disabled {
                @apply
                    bg-gray-200
                    text-gray-500;
            }
        }
    }

    .markdown {
        @apply
            flex-1
            border
            border-gray-300
            w-full
            py-2
            px-4
            text-gray-700
            rounded-lg
            cursor-pointer;
    }

    &-empty{
        @apply
            font-light
            text-sm
            text-gray-600;
    }
}

</style>