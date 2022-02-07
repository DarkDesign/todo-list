<template>

    <div>

        <vue-markdown
            class="markdown-content"
            v-if="content.length > 0"
            :source="content"></vue-markdown>

        <div
            v-else>

            <slot></slot>

        </div>

    </div>

</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

// @ts-ignore
import VueMarkdown from 'vue-markdown-v2';

@Component({
    components: {
        'vue-markdown': VueMarkdown,
    }
})
export default class MarkdownAreaComponent extends Vue {

    @Prop({required: true})
    public content!: string;

}
</script>


<style lang="scss">

.markdown-content {

    h1 {
        @apply text-6xl font-normal leading-normal mt-0 mb-2 text-gray-800;
    }

    h2 {
        @apply text-5xl font-normal leading-normal mt-0 mb-2 text-gray-800;
    }

    h3 {
        @apply text-4xl font-normal leading-normal mt-0 mb-2 text-gray-800;
    }

    h4 {
        @apply text-3xl font-normal leading-normal mt-0 mb-2 text-gray-800;
    }

    h5 {
        @apply text-2xl font-normal leading-normal mt-0 mb-2 text-gray-800;
    }

    h6 {
        @apply text-xl font-normal leading-normal mt-0 mb-2 text-gray-800;
    }

    p {
        @apply text-base font-light leading-relaxed mt-0 text-gray-800;
    }

    pre {}

    code {}

    ol{
        @apply list-decimal ml-5;

        li{}
    }

    ul{
        @apply list-disc ml-5;

        li{}
    }

    * ol,
    * ul {
        @apply ml-5;
    }

}

</style>
