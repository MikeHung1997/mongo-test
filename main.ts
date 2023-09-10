import { Student } from './viewmodel.ts';
import { createCollection } from "./testMongo.ts";

await createCollection('test', 'test', Student)


