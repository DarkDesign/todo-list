<template>
    <div
        class="date">{{formatter()}}</div>
</template>


<script lang="ts">
import { Timer } from '@/core/global-timer';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class DateComponent extends Vue {

    private now: Date = new Date();

    @Prop({required: true})
    public date!: number;

    public mounted():void {

        Timer.getInstance().subscribe(
            'date-component',
            {
                call: () => {
                    this.now = new Date();
                    return true;
                }
            },
            -1,
            -1
        );

    }

    public destroyed(): void {

        Timer.getInstance().unsubscribe('date-component');

    }

    public formatter(): string {
        let now = this.now;
        let date = new Date(this.date);
        let timeDifference = Math.floor(
            (now.getTime() - date.getTime()) / 1000 / 60
        );

        const oneDay = 60 * 24;

        if (timeDifference > oneDay) {
            if (timeDifference < oneDay * 2) {

                return 'вчера';

            } else {

                const number = Math.floor(timeDifference / oneDay);
                return `${number} ${this.declOfNum(number, ['день', 'дня', 'дней'])} назад`;

            }
        } else {
            if (timeDifference > 60) {

                const number = Math.floor(timeDifference / 60);
                return `${number} ${this.declOfNum(number, ['час', 'часа', 'часов'])} назад`;

            } else {

                if (timeDifference > 0) {

                    return `${timeDifference} ${this.declOfNum(timeDifference, ['минуту', 'минуты', 'минут'])} назад`;

                } else {

                    return 'только что';

                }

            }
        }
    }

    private declOfNum(number: number, words: string[]){
        return words[
            (number % 100 > 4 && number % 100 < 20)
                ? 2
                : [2, 0, 1, 1, 1, 2]
                    [
                        (number % 10 < 5)
                            ? number % 10
                            : 5
                    ]
            ];
    }

}
</script>


<style scoped lang="scss">
.date{
    @apply font-light text-gray-500 text-xs text-right mt-0.5;
}
</style>
