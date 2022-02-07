import { CallbackType, ITimerCallbacks } from '../interfaces';

export class TimerSubscriber {

    private _isActive: boolean = true;
    private _calls: number = 1;

    public constructor(
        public readonly name: string,
        public readonly callback: ITimerCallbacks,
        public readonly callingInterval: number,
        public readonly numberOfCalls: number
    ){
        this.performCallback(CallbackType.Subscribe);
    }

    public destructor(): void{
        this.performCallback(CallbackType.Completed);
    }

    public unsubscribe(): void{
        this.performCallback(CallbackType.Unsubscribe);
    }


    public get calls(): number { return this._calls; }
    public get isActive(): boolean { return this._isActive; }

    public call(): void {
        if (!this._isActive) return;

        this.performCallback(CallbackType.Call);

        this.checkActive();
    }

    private checkActive(): void {
        this._calls++;

        if (this.numberOfCalls === -1)
            return;

        if (this._calls > this.numberOfCalls)
            this._isActive = false;
    }

    private performCallback(type: CallbackType): void {
        switch (type){
            case CallbackType.Call:
                if (
                    this.isFunction(this.callback.call)
                ) this.callback.call(this.calls);
                break;
            case CallbackType.Subscribe:
                if (
                    !!this.callback.subscribe
                    && this.isFunction(this.callback.subscribe)
                ) this.callback.subscribe(this);
                break;
            case CallbackType.Unsubscribe:
                if (
                    !!this.callback.unsubscribe
                    && this.isFunction(this.callback.unsubscribe)
                ) this.callback.unsubscribe();
                break;
            case CallbackType.Completed:
                if (
                    !!this.callback.completed
                    && this.isFunction(this.callback.completed)
                ) this.callback.completed();
                break;
        }
    }

    private isFunction(func: any): boolean {
        return typeof func === "function";
    }
}