import { IHistoryList, IHistory } from '@/models/history/interfaces';



export class History<T> {
    public static fromData<T>(data: IHistory<T>): History<T> {
        return new History(
            data.maxLength,
            data.list,
            data.length,
            data.marker
        );
    }
    public toData(): IHistory<T> {
        return {
            maxLength: this._maxLength,
            list: this._list,
            marker: this._marker,
            length: this._length
        }
    }



    public constructor(
        private _maxLength: number = 30,
        private _list: IHistoryList<T> = {},
        private _length: number = 1,
        private _marker: number = 1
    ) {}

    public set item(value: T) {
        this._length = this._marker;
        if(this._length >= this._maxLength){
            this.shiftKeys();
        }
        this._list[++this._length] = value;
        this._marker = this._length;
    }

    public get length(): number { return this._length; }
    public get marker(): number { return this._marker; }

    public previous(): T{
        if (this._marker > 1) {
            return this._list[--this._marker];
        }else return this._list[0];
    }

    public next(): T {
        if (this._marker < this._length) {
            return this._list[++this._marker];
        }else return this._list[this._length];
    }

    private shiftKeys(): void {
        for (let index = 2; index < this._maxLength; index++) {
            this._list[index-1] = this._list[index];
        }
        this._length--;
    }

}