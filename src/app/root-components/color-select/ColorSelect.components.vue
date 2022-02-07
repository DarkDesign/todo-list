<template>

    <div
        class="color">

        <div
            class="none"
            :class="{ 'color--checked' : colorType === Color.None }"
            @click="colorType = Color.None"></div>

        <div
            class="red"
            :class="{ 'color--checked' : colorType === Color.Red }"
            @click="colorType = Color.Red"></div>

        <div
            class="indigo"
            :class="{ 'color--checked' : colorType === Color.Indigo }"
            @click="colorType = Color.Indigo"></div>

        <div
            class="green"
            :class="{ 'color--checked' : colorType === Color.Green }"
            @click="colorType = Color.Green"></div>

        <div
            class="yellow"
            :class="{ 'color--checked': colorType === Color.Yellow }"
            @click="colorType = Color.Yellow"></div>

    </div>

</template>


<script lang="ts">


import IconComponent from '@/app/root-components/icons/material/Icon.component.vue';
import { Color } from '@/core/types';
import { Component, VModel, Vue } from 'vue-property-decorator';

@Component({
    components: {
        'material-icon': IconComponent,
    }
})
export default class ColorSelectComponents extends Vue {

    @VModel({ type: String })
    public colorType!: Color;

    public Color = Color;

}

</script>


<style scoped lang="scss">

</style>
