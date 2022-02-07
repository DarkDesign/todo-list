import { TimerSubscriber } from '../../timer-subscriber/TimerSubscriber';

export interface ITimerCallbacks {

    readonly subscribe?: (subscriber: TimerSubscriber) => any;

    readonly call: (calls: number) => boolean;

    readonly unsubscribe?: () => any;

    readonly completed?: () => any;

}