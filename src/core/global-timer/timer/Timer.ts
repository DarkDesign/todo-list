import { TimerSubscriber } from '../timer-subscriber/TimerSubscriber';
import { ITimerCallbacks } from '../interfaces';

export class Timer {
    private static singletonInstance: Timer;
    public static getInstance(): Timer {
        if (!Timer.singletonInstance)
            Timer.singletonInstance = new Timer();

        return Timer.singletonInstance;
    }


    private _instance: number | null = null;

    private _startTime: number = 0;
    private _currentTime: number = 0;
    private _tickIntervalSec: number = -1;

    private get _intervalMs(): number { return this._tickIntervalSec * 1000; }
    private get _isActive(): boolean { return this._tickIntervalSec !== -1; }

    private _subscribers: Array<TimerSubscriber> = [];

    // callingInterval -1  ->  nearest tick.
    // numberOfCalls -1    ->  until unsubscribe.
    public subscribe(
        listener: string,
        callback: ITimerCallbacks,
        callingIntervalSec: number = -1,
        numberOfCalls: number = -1
    ): TimerSubscriber {
        const timerSubscriber: TimerSubscriber = new TimerSubscriber(
            listener,
            callback,
            this.correctInterval(callingIntervalSec),
            numberOfCalls
        );

        this._subscribers.push(timerSubscriber);

        this.calculateInterval();

        return timerSubscriber;
    }

    public unsubscribe(
        listener: TimerSubscriber | string
    ): void {
        if (typeof listener === "string") {
            this._subscribers = this._subscribers
                .filter(
                    subscriber => {
                        const isDelete: boolean = subscriber.name === listener;
                        if(isDelete) subscriber.unsubscribe();
                        return !isDelete;
                    }
                );
        } else {
            this._subscribers = this._subscribers
                .filter(
                    subscriber => {
                        const isDelete: boolean = subscriber === listener;
                        if(isDelete) subscriber.unsubscribe();
                        return !isDelete;
                    }
                );
        }

        this.calculateInterval();
    }

    private deleteCompletedSubscriptions(): boolean {
        const subscribersLength: number = this._subscribers.length
        this._subscribers = this._subscribers
            .filter(
                subscriber => subscriber.isActive
            );
        return subscribersLength > this._subscribers.length;
    }


    private correctInterval(interval: number): number{
        if (interval === -1) return interval;
        if (interval === 0) interval = 2;
        return interval % 2 === 0
            ? interval
            : interval + 1;
    }


    private tick(): void {
        this._subscribers.forEach(
            subscriber => {
                if (
                    (this._currentTime / 1000)
                    % subscriber.callingInterval == 0
                ) subscriber.call();
            }
        );
        if (this.deleteCompletedSubscriptions())
            this.calculateInterval();
    }



    private runInstance(): void {
        if (this._instance !== null) clearTimeout(this._instance);
        if (this._isActive) {
            this._startTime = new Date().getTime();
            this._currentTime = 0;
            this._instance = window.setTimeout(
                () => this.instance(),
                this._intervalMs
            );
        }
    }

    private instance(): void {
        this.tick();
        if (this._instance !== null) clearTimeout(this._instance);
        if (this._isActive) {

            this._currentTime += this._intervalMs;
            const timeDiff = (new Date().getTime() - this._startTime) - this._currentTime;
            this._instance = window.setTimeout(
                () => this.instance(),
                this._intervalMs - timeDiff
            );

        }
    }

    protected calculateInterval(): void {
        const currentInterval = this._tickIntervalSec;
        const intervals: number[] = this._subscribers.reduce(
            (newArray, subscriber) => {
                if (subscriber.callingInterval > -1) {
                    newArray.push(subscriber.callingInterval)
                }
                return newArray;
            },
            new Array<number>()
        );

        if (intervals.length === 0) {
            if (this._subscribers.length !== 0) {
                this._tickIntervalSec = 30;
            } else {
                this._tickIntervalSec = -1;
            }
        } else {
            const minTimerInterval = this.calculateGreatestCommonDivisor(
                ...intervals
            );

            if (minTimerInterval > 0) this._tickIntervalSec = minTimerInterval;
            else this._tickIntervalSec = 30;
        }
        if (currentInterval !== this._tickIntervalSec) {
            this.runInstance();
        }
    }

    protected calculateGreatestCommonDivisor(...numbers: number[]): number {
        if (numbers.length === 1) return numbers[0];
        let divisor = Math.max(...numbers);
        while (divisor >= 1) {
            if (
                numbers.every(
                    number => number % divisor === 0
                )
            ) break;
            divisor--;
        }
        return divisor;
    }
}