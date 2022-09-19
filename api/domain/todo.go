package domain

// Todo IDとテキスト（todoの中身）,完了してるかどうかのcompleted
// タスクを表現したオブジェクト
type Todo struct {
	ID        int    `json:"id"`
	Text      string `json:"text"`
	Completed bool   `json:"completed"`
}

// TodoUsecase todoの使用例、todoリストのCURDを定義してあるインターフェース
type TodoUsecase interface {
	AllGet() ([]Todo, error)
	StatusUpdate(id int) error
	Store(todo Todo) error
	Delete(id int) error
}

// TodoRepository todoリストの倉庫。todoリストの管理を行うメソッドのインターフェース
// データベースにアクセスするためのインターフェースでもある。
type TodoRepository interface {
	AllGet() ([]Todo, error)
	StatusUpdate(id int) error
	Store(todo Todo) error
	Delete(id int) error
}
