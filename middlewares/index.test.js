const { isLoggedIn, isNotLoggedIn } = require('./');

describe('isLoggedIn', () => {
    const next = jest.fn();
    test('로그인되어 있으면 isLoggedIn 이 next 를 호출해야 함.', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        isLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);
    });

    test('로그인되이 있지 않으면 isLoggedIn 이 에러(403) 를 응답해야 함', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('로그인 필요.');
    });
});

describe('isNotLoggedIn', ()=> {
    const next = jest.fn();
    test('로그인되어 있으면 isNotLoggedIn 이 에러를 응답해야 함.', () => {
        const req = {
            isAuthenticated: jest.fn(() => true),
        };
        const res = {
            redirect: jest.fn(),
        };
        isNotLoggedIn(req, res, next);
        const message = encodeURIComponent('로그인 상태입니다.');
        expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    });

    test('로그인되어 있지 않으며 isNotLoggedIn 이 next를 호출해야 함.', () => {
        const req = {
            isAuthenticated: jest.fn(() => false),
        };
        const res = {
            status: jest.fn(() => res),
            send: jest.fn(),
        };
        isNotLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1);
    });
})