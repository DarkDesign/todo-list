<template>

    <span
        class="material-icons-round"
        :class="[`md-${size}`]"
        v-text="name"></span>

</template>



<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IconName, IconSize } from './interfaces';

@Component
export default class IconComponent extends Vue {

    @Prop({required: true})
    public name!: IconName;

    @Prop({default: 24})
    public size!: IconSize;

}
</script>



<style scoped lang="scss">

</style>