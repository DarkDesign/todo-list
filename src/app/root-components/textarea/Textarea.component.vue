<template>

    <div>

        <textarea
            ref="textarea"
            :class="color"
            v-model="text"
            @input="autoResize()"
            @keydown.tab.exact.prevent="addTab()"
            @keydown.shift.tab.prevent="deleteTab()"></textarea>

    </div>

</template>


<script lang="ts">
import { Color } from '@/core/types';
import { Component, Vue, Prop, VModel, Ref } from 'vue-property-decorator';

@Component
export default class TextareaComponent extends Vue {

    @Prop({default: Color.None})
    public color!: Color;

    @VModel({ type: String, default: '' })
    public text!: string;

    @Ref('textarea')
    private $textareaRef!: HTMLInputElement;

    private autoResize(): void {
        this.$textareaRef.style.height = 'auto';
        this.$textareaRef.style.height = this.$textareaRef.scrollHeight + "px";
    }

    public focus(): void {
        this.$textareaRef.focus();
    }

    public addTab(): void {

        let selObj = window.getSelection();

        if (!!selObj?.toString()) {

            const selectStart = this.$textareaRef.selectionStart as number;
            const selectEnd = this.$textareaRef.selectionEnd as number;

            const replaceable: string = selObj.toString();
            const replacement: string = this.addTabInText(replaceable);
            const increaseSelect: number = Math.abs(replaceable.length - replacement.length);

            this.text = this.text.replace(replaceable, replacement);

            this.$nextTick(() => {
                this.$textareaRef.setSelectionRange(
                    selectStart,
                    selectEnd + increaseSelect
                );
            });

        } else {

            const carriage = this.$textareaRef.selectionStart as number;
            let startText = this.text.slice(0, carriage);
            let endText = this.text.slice(carriage);
            this.text = `${startText}\t${endText}`;

            this.$nextTick(() => {
                const newCarriage = carriage + 1;
                this.$textareaRef.setSelectionRange(newCarriage, newCarriage);
            });

        }

    }

    public deleteTab(): void {

        let selObj = window.getSelection();

        if (!!selObj?.toString()) {

            const selectStart = this.$textareaRef.selectionStart as number;
            const selectEnd = this.$textareaRef.selectionEnd as number;

            const replaceable: string = selObj.toString();
            const replacement: string = this.removeTabInText(replaceable);
            const increaseSelect: number = Math.abs(replaceable.length - replacement.length);

            this.text = this.text.replace(replaceable, replacement);

            this.$nextTick(() => {
                this.$textareaRef.setSelectionRange(
                    selectStart,
                    selectEnd - increaseSelect
                );
            });

        }

    }

    private addTabInText(value: string): string {
        const regexp = /^(.*)$/gm;
        return value.replace(regexp, `\t$1`);
    }

    private removeTabInText(value: string): string {
        const regexp = /^([\t])(.*)/gm;
        return value.replace(regexp, `$2`);
    }

    // -- Lifecycle hooks

    public created(): void {
        this.$nextTick(() => {
            this.autoResize();
        });
    }

}
</script>


<style scoped lang="scss">
textarea{
    @apply overflow-hidden resize-none;
}
</style>
