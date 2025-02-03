# 🏛 Zustand vs Redux

Zustand와 Redux는 둘 다 **React에서 전역 상태 관리**를 위한 라이브러리지만, 설계 방식과 사용성이 꽤 다르다.

# 1️⃣ Redux vs Zustand 주요 차이점

| 특징                   | Redux                                                   | Zustand                              |
| ---------------------- | ------------------------------------------------------- | ------------------------------------ |
| 설정 복잡도            | ✅ 비교적 복잡 (Boilerplate 코드 많음)                  | 🚀 간단 (기본 함수만으로 사용 가능)  |
| Reducer 필요 여부      | ✅ reducer 필수                                         | ❌ 불필요                            |
| Action & Dispatch 방식 | ✅ dispatch(action)을 통해 상태 변경                    | 🛠 직접 상태 변경 가능 (mutate 방식)  |
| Middleware 지원        | ✅ 강력한 Middleware (Redux Thunk, Saga 등)             | ✅ Middleware 가능하지만 기본 제공 X |
| 비동기 처리            | 🔄 Redux Thunk / Redux Saga 필요                        | 🚀 직접 비동기 함수 사용 가능        |
| 리액트 종속 여부       | 🔗 React에 종속적이지 않음 (Vanilla JS에서도 사용 가능) | 🔗 React 기반으로 설계됨             |
| 사용자 경험 (DX)       | 📜 보일러플레이트 많음                                  | 🔥 직관적이고 간결                   |
| 메모리 성능            | ⏳ 약간 무거움 (Immer + 깊은 복사 사용)                 | ⚡ 가벼움 (shallow copy 사용)        |

# 2️⃣ Redux란?

Redux는 **Flux 아키텍처**를 기반으로 한 상태 관리 라이브러리다.

## **🔹 핵심 개념**

1. Store: 상태를 저장하는 곳
2. Actions: 상태를 변경하기 위한 명령
3. Reducers: 현재 상태와 action을 받아 새로운 상태를 반환하는 함수
4. Dispatch: action을 store에 전달하는 함수
5. Selector: store에서 필요한 데이터만 가져오는 함수

## ✅ Redux 사용 예제

```js
import { createStore } from "redux"

// 1. 초기 상태
const initialState = { count: 0 }

// 2. 리듀서 함수
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 }
    case "DECREMENT":
      return { count: state.count - 1 }
    default:
      return state
  }
}

// 3. 스토어 생성
const store = createStore(counterReducer)

// 4. 상태 변경
store.dispatch({ type: "INCREMENT" })
console.log(store.getState()) // { count: 1 }
```

Redux는 dispatch(action)을 호출해야 상태를 변경할 수 있고, 상태 변경이 항상 **불변성(immutability)** 을 유지해야 한다.

# 3️⃣ Zustand란?

Zustand는 Redux보다 더 직관적이고 간결한 API를 제공하는 상태 관리 라이브러리다.

## ✅ 특징

- React Hooks 기반으로 동작
- Boilerplate 코드가 거의 없음
- Redux처럼 action과 dispatch 없이 직접 상태를 변경 가능
- useStore 훅을 사용해 간편하게 상태를 구독

## ✅ Zustand 사용 예제

```js
import { create } from "zustand"

// 1. Zustand 스토어 생성
const useCounterStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}))

// 2. React 컴포넌트에서 사용
function Counter() {
  const { count, increase, decrease } = useCounterStore()

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </div>
  )
}
```

useCounterStore() 훅을 사용해 상태를 쉽게 가져올 수 있고, set()을 호출하면 직접 상태를 변경할 수 있다.

# 4️⃣ Redux vs Zustand 비교 요약

## ✅ Redux

✔️ 대규모 프로젝트에 적합
✔️ 상태 변경 흐름이 명확하지만, Boilerplate 코드가 많음
✔️ Middleware, DevTools 지원이 강력

## ✅ Zustand

✔️ 소규모/중규모 프로젝트에 적합
✔️ 가볍고 간결하며, Hook 기반이라 사용하기 편리
✔️ 상태 변경이 Redux보다 직관적 (직접 set() 호출 가능)

# 5️⃣ Redux와 Zustand 이전에는 어떻게 상태 관리를 했을까?

> React에서 Redux나 Zustand 같은 상태 관리 라이브러리가 나오기 전에는 보통 **Prop Drilling** 또는 **Context API**를 사용했다.

## 1. Prop Drilling

부모 → 자식 → 손자 컴포넌트로 props를 계속 전달하는 방식.

```js
function Parent() {
  const [count, setCount] = useState(0)
  return <Child count={count} setCount={setCount} />
}

function Child({ count, setCount }) {
  return <GrandChild count={count} setCount={setCount} />
}

function GrandChild({ count, setCount }) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
```

### 🚨 문제점

- 깊이 중첩된 컴포넌트에 데이터를 전달하기 어려움
- 컴포넌트가 많아질수록 코드 유지보수가 어려움

## 2. Context API

React의 createContext를 활용해 전역 상태를 제공하는 방식.

```js
const CounterContext = createContext()

function CounterProvider({ children }) {
  const [count, setCount] = useState(0)
  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  )
}

function GrandChild() {
  const { count, setCount } = useContext(CounterContext)
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

function App() {
  return (
    <CounterProvider>
      <GrandChild />
    </CounterProvider>
  )
}
```

### 🚀 장점

- Prop Drilling 문제 해결
- 간단한 상태 관리에 적합

### ⚠️ 단점

- 상태가 변경될 때 모든 하위 컴포넌트가 리렌더링됨
- 복잡한 비즈니스 로직을 다루기에 부족함

## 6️⃣ 결론

1. 과거에는 Prop Drilling과 Context API를 주로 사용했지만, 유지보수가 어렵고 성능 이슈가 있었음.
2. Redux는 강력하지만, Boilerplate 코드가 많아 설정이 복잡함.
3. Zustand는 Redux보다 간결하고 사용하기 쉬우며, 성능도 좋음.
4. 대규모 프로젝트에는 Redux, 중소규모에는 Zustand가 적합함.

**👉 “대규모 프로젝트, 복잡한 비즈니스 로직이 필요하면 Redux”**

**👉 “간단하고 가볍게 상태를 관리하려면 Zustand”**
