import { IHistoryList } from './IHistoryList';

export interface IHistory<T> {
    readonly maxLength: number;
    readonly list: IHistoryList<T>;
    readonly length: number;
    readonly marker: number;
}