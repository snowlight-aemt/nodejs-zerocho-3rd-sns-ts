import IUser from '../models/user';

declare global {
    interface Error {
        status: number;
    }
}

declare global {
    namespace Express {
        interface User extends IUser {}
    }
}

// `export` 또는 import 가 있어야지만 모듈로 인식함.
// export {}