export class ViewModelBase {
    _id = crypto.randomUUID();
    updateBy: Coding = new Coding();
    updateAt: Date = new Date();


    static UNIQUES: Key[] = [];
    static INDEXS: Key[] = [];

}

export class Key {
    [key: string]: 1 | -1;

}
export class Coding {
    code: string = '';
    display: string = '';
    constructor(that?: Partial<Coding>) {
        Object.assign(this, structuredClone(that))

    }
}