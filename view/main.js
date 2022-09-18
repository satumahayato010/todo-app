const form = document.getElementById("form")
const input = document.getElementById("input")
const todoUL = document.getElementById("todos")


const todos = JSON.parse(localStorage.getItem("todos"))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

function updateLS() {

    // liタグの要素を全部取得してくる。
    todosEl = document.querySelectorAll("li")

    // データを格納するための、空のリスト作成
    const todos = []

    todosEl.forEach(todosEl => {
        // liタグで取得した内容を空のリストにpushしていく。
        todos.push({
            text: todosEl.innerText,
            completed: todosEl.classList.contains("completed")
        })
    })
    // ローカルストレージにtodosっていうキーでデータを保存する。
    localStorage.setItem("todos", JSON.stringify(todos))
}

form.addEventListener("submit", (e) => {
    // デフォルトの動きをキャンセルする。
    // ここでは、submitした時にページがリダイレクトされるのでキャンセルしてる。
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    // 入力文字を取得
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }
    if(todoText) {
        // liタグを作成する。
        const todoEl = document.createElement("li")
        // タスク完了かをチェック
        // todoはオブジェクトを格納でき、completedを持っている。
        if(todo && todo.completed) {
            todoEl.classList.add("completed")
        }
        todoEl.innerText = todoText

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed")

            updateLS()
        })
        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()

        })
        todoUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}



