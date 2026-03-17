# JavaScript/TypeScript 스키마 검증 라이브러리 비교: Yup, Joi, Zod

데이터 검증은 웹 개발에서 중요한 요소다. 입력 값이 예상한 형식인지 확인하고, 문제가 발생하기 전에 방지할 수 있기 때문이다.

JavaScript 및 TypeScript에서 많이 사용하는 데이터 검증 라이브러리로는 **Yup**, **Joi**, **Zod**가 있다. 이 글에서는 세 라이브러리를 비교하고, 각각 어떤 상황에서 적합한지 알아보겠다.

---

## ✅ 공통점

세 라이브러리는 다음과 같은 공통점을 가진다.

- **입력 데이터의 유효성 검사**: 특정 데이터가 요구 조건을 충족하는지 확인 가능
- **스키마 정의 지원**: 객체, 배열, 문자열 등의 데이터 타입을 정의하고 검증 가능
- **유효성 검사 기능 제공**: `required`, `min`, `max`, `pattern` 등의 다양한 검증 메서드 지원

하지만 각각의 라이브러리는 특징이 다르기 때문에 특정 환경에서 더 적합하게 사용할 수 있다.

---

## ✅ 라이브러리 비교

| 라이브러리 | 특징                                    | TypeScript 지원         | 성능      | 주요 사용 사례            |
| ---------- | --------------------------------------- | ----------------------- | --------- | ------------------------- |
| **Yup**    | 직관적인 API, React와 잘 어울림         | ❌ (런타임 검증만 가능) | 빠름      | 프론트엔드 폼 검증        |
| **Joi**    | Node.js 백엔드에 특화, 강력한 검증 기능 | ❌ (런타임 검증만 가능) | 느림      | Express/Koa API 요청 검증 |
| **Zod**    | 타입스크립트 친화적, 정적 타입 지원     | ✅ (런타임 + 정적 타입) | 매우 빠름 | TypeScript 프로젝트       |

---

## ✅ 라이브러리별 특징과 사용법

### 1️⃣ Yup

**Yup**은 **프론트엔드 폼 검증**에 적합한 라이브러리다. `Formik`과 함께 사용하기 좋다.

#### 📌 주요 특징

- React 환경에서 폼 검증을 쉽게 구현 가능
- 직관적인 API 제공
- TypeScript 정적 타입을 직접 지원하지 않음

#### ✅ Yup 예제

```javascript
import * as yup from "yup"

const schema = yup.object({
  name: yup.string().required(),
  age: yup.number().min(18).required(),
})

schema
  .validate({ name: "John", age: 20 })
  .then(() => console.log("Valid!"))
  .catch((err) => console.log(err.errors))
```

#### ✅ Yup의 장단점

✔️ 장점

- React/Formik과 잘 맞음
- 사용법이 직관적이고 배우기 쉬움

❌ 단점

- TypeScript 정적 타입 지원 없음
- 런타임 검증만 가능

---

### 2️⃣ Joi

**Joi**는 **백엔드 API 요청 검증**에 최적화된 라이브러리다. Express나 Koa 같은 Node.js 프레임워크에서 많이 사용된다.

#### 📌 주요 특징

- **백엔드 검증 기능이 강력**하며, 조건부 검증(`when`, `custom`, `alternatives`)을 지원
- **런타임 성능이 다소 느림**
- TypeScript 정적 타입을 직접 지원하지 않음

#### ✅ Joi 예제

```javascript
import Joi from "joi"

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().min(18).required(),
})

const { error } = schema.validate({ name: "John", age: 20 })

if (error) {
  console.log(error.details)
} else {
  console.log("Valid!")
}
```

#### ✅ Joi의 장단점

✔️ 장점

- 백엔드 API 요청 검증에 최적화
- 조건부 검증(`when`) 기능이 강력

❌ 단점

- TypeScript 정적 타입 지원 없음
- 런타임 성능이 상대적으로 느림

---

### 3️⃣ Zod

**Zod**는 **TypeScript 친화적인 검증 라이브러리**다. 런타임 검증과 정적 타입 검증을 동시에 지원하는 것이 가장 큰 장점이다.

#### 📌 주요 특징

- TypeScript 정적 타입 추론 가능 (`z.infer<T>` 지원)
- 런타임과 정적 타입 검증을 모두 지원
- 성능이 가장 빠름

#### ✅ Zod 예제

```typescript
import { z } from "zod"

const schema = z.object({
  name: z.string(),
  age: z.number().min(18),
})

type User = z.infer<typeof schema> // TypeScript 타입 추론 가능

const result = schema.safeParse({ name: "John", age: 20 })

if (result.success) {
  console.log("Valid!")
} else {
  console.log(result.error)
}
```

#### ✅ Zod의 장단점

✔️ 장점

- TypeScript 정적 타입 지원
- 런타임과 정적 타입 검증을 동시에 제공
- 성능이 가장 빠름

❌ 단점

- Joi만큼 다양한 검증 기능을 제공하지 않음
- 일부 동적 검증(`when`) 기능 부족

---

## ✅ 언제 어떤 라이브러리를 선택해야 할까?

| 사용 사례                           | 추천 라이브러리 |
| ----------------------------------- | --------------- |
| 프론트엔드 폼 검증 (React)          | **Yup**         |
| Node.js API 요청 검증 (Express/Koa) | **Joi**         |
| TypeScript 기반 프로젝트            | **Zod**         |
| 런타임 성능이 중요한 경우           | **Zod**         |
| 유연한 조건부 검증이 필요한 경우    | **Joi**         |

---

## ✅ 결론

- **React에서 폼 검증**할 때는 `Yup`이 적합하다.
- **백엔드 API 검증**에는 `Joi`가 많이 사용되지만, 성능 문제로 `Zod`를 대체하는 경우가 많다.
- **TypeScript 프로젝트**에서는 `Zod`가 가장 강력한 선택이다.

👉 **`Zod`가 최근 가장 인기 있고 추천되는 라이브러리**지만, 상황에 따라 `Yup`과 `Joi`도 여전히 많이 사용된다!
