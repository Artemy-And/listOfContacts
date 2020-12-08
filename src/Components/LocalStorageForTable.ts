// !!! это отдельная таска, и НЕ нужно её делать внутри EditableSpan!!!
// * вот вам функция для сохранения объектов в память браузера (данные в этом хранилище сохраняться даже при перезагрузке компа):
export function saveState<T>(key: string, state: T) {//****************почему тут Т,я могу заменить его на string?
    const stateAsString = JSON.stringify(state);
    localStorage.setItem(key, stateAsString)
}

// * и вот вам функция для получения сохранённого объекта в памяти браузера:
export function restoreState<T>(key: string, defaultState: T) {

    const stateAsString = localStorage.getItem(key);
    if (stateAsString !== null) defaultState = JSON.parse(stateAsString) as T;
    return defaultState;
}

// * использование:
type StateType = {
    x: string
    y: number
}

saveState<StateType>("test", {x: "A", y: 1});
// сохраняем объект типа StateType в ячейке "test"

const state: StateType = restoreState<StateType>("test", {x: "", y: 0});
// получем в переменную state объект из ячейки "test" или дэфолтный объект если ячейка пуста
// * добавьте на страницу Junior в компоненте для демонстрации EditableSpan 2 кнопки: одна должна сохранять значение EditableSpan в браузере, другая восстанавливать значение из браузера

