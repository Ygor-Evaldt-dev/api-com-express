import jsonfile from 'jsonfile';
import path from 'path';

import IDb from '@src/ports/IDb';

const DB_FILE_NAME = 'database.json';

export default class MokOrm {
    async open(): Promise<IDb> {
        return jsonfile.readFile(path.join(__dirname, "/", DB_FILE_NAME)) as Promise<IDb>;
    }

    async save(db: IDb): Promise<void> {
        return jsonfile.writeFile(path.join(__dirname, "/", DB_FILE_NAME), db);
    }
}

