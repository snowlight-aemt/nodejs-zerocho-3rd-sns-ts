# 설정하기

## .env 설정 파일 
```
COOKIE_SECRET=
KAKAO_ID=
```

## Typescript
* compilerOptions 컨파일러 설정
* target: "es2015" 자바스크립트 버전
* module: commonjs
* exModuleInterop: true module 에 commonjs 와 호환을 위해서
* forceConsistentCasingInFileNames: true 대소문자 구분
* strict: true 엄격한 검사
* skipLibCheck 모든 라이브러리 스킵 

## Typescript 변환 작업.
1. 모든 파일에 const ... require => import ... from 를 변경
2. `npx tsc --noEmit` // 타입 검사
3. `npx tsc` // ts -> js 파일 변환
4. `!`
   * process.env.COOKIE_SECRET! : undefined 가 절대 아니다.


```
npm i typescript
npx tsc --init
npx tsc (npx tsc --noEmit)
```

## 파일 구조 대한 정리

```
middlewares
passport
app.ts
 > routers (auth, page, post)
  > controllers (auth, page)
views
public
models
```

TODO
* middlewares 란 무엇인가?