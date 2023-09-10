
import { ViewModelBase, Key } from "./viewmodel-base.ts";

export class Student extends ViewModelBase {
    score: Score = new Score();
    age: number = 0;
    school: string = '';
    list: string[] = [];
    constructor(that?: Partial<Student>) {
        super();
        Object.assign(this, structuredClone(that))

    }

    static override  UNIQUES: Key[] = [{ "score": -1 }];
    static override  INDEXS: Key[] = [{ "age": 1, "_id": -1 }];
}


export class Score {
    score: number = 0;
    subject: Coding = new Coding();
    constructor(that?: Partial<Score>) {
        Object.assign(this, structuredClone(that))

    }
}
export class Coding {
    code: string = '';
    display: string = '';
    constructor(that?: Partial<Coding>) {
        Object.assign(this, structuredClone(that))

    }
}