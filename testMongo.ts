import { ViewModelBase } from './viewmodel-base.ts';
import {

    IndexOptions,
    MongoClient,
} from "https://deno.land/x/mongo@v0.32.0/mod.ts";

class ClassFactory {
    static create(c: any) {
        return new Proxy(
            Reflect.construct.bind(null, c), {}
        )([]);
    }
}


export async function createCollection(dbName: string, collectionName: string, viewmodel: typeof ViewModelBase) {
    const client = new MongoClient();
    await client.connect("mongodb://localhost:27017");



    const collection = await client.database(dbName).createCollection<typeof viewmodel>(collectionName, {
        validator: {
            $jsonSchema: createSchema(ClassFactory.create(viewmodel))
        }
    });

    const indexes: IndexOptions[] = [];
    let key = 0;
    if (viewmodel.INDEXS.length > 0) {
        viewmodel.INDEXS.forEach(x => {
            indexes.push({ name: `key${key++}`, unique: true, key: x })
        })


    }
    if (viewmodel.UNIQUES.length > 0) {
        viewmodel.INDEXS.forEach(x => {
            indexes.push({ name: `key${key++}`, key: x })
        })

    }
    await collection.createIndexes({ indexes })
    client.close();

}

function getBsonType(type: string) {
    let bsonType = 'string';
    if (type === 'number') {
        bsonType = 'int';
    } else if (type === 'array') {
        bsonType = 'array';
    } else if (type === 'boolean') {
        bsonType = 'bool';
    } else if (type === 'date') {
        bsonType = 'date';
    }
    return {
        bsonType
    }
}
function createSchema(data: any) {

    const values = Object.values(data);
    const required = Object.keys(data);
    const properties: Properties = {};
    required.forEach((x, y) => {
        const value = values[y];
        if (x === '_id') {
            return;
        }
        if (value instanceof Object) {
            if (Array.isArray(value)) {
                properties[x] = getBsonType('array');
            } else if (value instanceof Date) {
                properties[x] = getBsonType('date');
            } else {
                properties[x] = createSchema(value);
            }

        } else {
            properties[x] = getBsonType(typeof value);
        }
    })
    return {
        bsonType: "object",
        required,
        properties

    }
}
class Properties {
    [key: string]: any;

}



