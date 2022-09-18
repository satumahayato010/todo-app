const form = document.getElementById("form")
const input = document.getElementById("input")
const todoUL = document.getElementById("todos")


const todos = JSON.parse(localStorage.getItem("todos"))

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