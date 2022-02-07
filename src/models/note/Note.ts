import { Color } from '@/core/types';
import { History } from '@/models/history/History';
import { INote } from '@/models/note/interfaces';

const DEBOUNCE_HISTORY: number = 700;

export class Note {
    public static fromData(data: INote): Note{
        return new Note(
            data.id,
            data.date,
            data.text,
            data.color,
            data.checked,
            History.fromData(data.history)
        );
    }
    public toData(): INote {
        return {
            id: this.id,
            date: this.date,
            text: this._text,
            color: this.color,
            checked: this.checked,
            history: this._history.toData()
        }
    }



    private _historyTimer: number | undefined;

    private _changeStop: boolean = true;

    public constructor(
       public readonly id: number,
       public readonly date: number,
       private _text: string = '',
       public color: Color = Color.None,
       public checked: boolean = false,
       private _history: History<string> = new History<string>()
    ) {}

    public set text(value: string) {
        this.saveHistory(this._text, value);
        this._text = value;
    }
    public get text(): string { return this._text; }


    public get isPrev(): boolean {
        return this._history.marker !== 1;
    }
    public get isNext(): boolean {
        return this._history.marker !== this._history.length;
    }

    public nextState(): void {
        this._changeStop = true;
        this._text = this._history.next();
    }

    public prevState(): void {
        this._changeStop = true;
        this._text = this._history.previous();
    }

    private saveHistory(
        oldValue: string,
        newValue: string
    ): void {
        if (
            !this._changeStop
            && this.isDifferentText(oldValue, newValue)
        ){
            clearTimeout(this._historyTimer);
            this._historyTimer = setTimeout(() => {
                this._history.item = newValue;
            }, DEBOUNCE_HISTORY);
        } else this._changeStop = false;
    }

    private isDifferentText(
        one: string,
        two: string
    ): boolean {
        return one !== two;
    }

}