import { Color } from '@/core/types';
import { IHistory } from '@/models/history/interfaces';

export interface INote {
    readonly id: number;
    readonly date: number;
    readonly text: string;
    readonly color: Color;
    readonly checked: boolean;
    readonly history: IHistory<string>;
}