package repository

import (
	"errors"
	"sync"
	"todo-app/domain"
)

type todoRepository struct {
	m sync.Map
}

// NewSyncMapTodoRepository todoRepositoryをインスタンス化する。返り値は、TodoRepositoryインターフェース
// todoRepositoryは、実装を満たしてるのでOK。
func NewSyncMapTodoRepository() domain.TodoRepository {
	return &todoRepository{}
}

// AllGet 全てのTodoを取得
func (t *todoRepository) AllGet() ([]domain.Todo, error) {
	var todos []domain.Todo

	t.m.Range(func(key interface{}, value interface{}) bool {
		todos = append(
			todos,
			// interface型をTodo型に変換
			value.(domain.Todo),
		)
		return true
	})

	return todos, nil
}

// StatusUpdate Todoのステータスを更新
func (t *todoRepository) StatusUpdate(id int) error {
	r, ok := t.m.LoadAndDelete(id)
	if !ok {
		return errors.New("Fail Load Data")
	}

	newTodo := r.(domain.Todo)
	if newTodo.Completed {
		newTodo.Completed = false
	} else {
		newTodo.Completed = true
	}

	t.Store(newTodo)
	return nil
}

// Store Todoを保存
func (t *todoRepository) Store(todo domain.Todo) error {
	t.m.Store(todo.ID, todo)
	return nil
}

// Delete Todoを削除
func (t *todoRepository) Delete(id int) error {
	t.m.Delete(id)
	return nil
}
