import "./styles.css";
import React, { PureComponent } from "react";
export default function App() {
  return (
    <div className="App">
      <TodolistClass />
    </div>
  );
}
// fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(json => console.log(json))
const mockData = {
  todos: [
    {
      id: 1,
      content: "running",
      isDone: false,
    },
    {
      id: 2,
      content: "coding",
      isDone: false,
    },
    {
      id: 3,
      content: "asdfasdf",
      isDone: true,
    },
  ],
};
const url = "http://localhost:3001/tasks/"; //how to install jsonServer
class TodolistClass extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = { val: "", list: [] };
  // }
  state = { val: "", list: [], editedLi: -1, saveInput: "", doneList: [] };
  // componentDidMount() {
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((tasks) => {
  //       // tasks.forEach((task) => {
  //       //   newList2.push(task.content)
  //       // })
  //       this.setState({ list: tasks.reverse() });
  //     })
  //     .catch((reason) => console.log(reason));
  // }
  componentDidMount() {
    this.setState({
      list: mockData.todos.filter((todo) => !todo.isDone),
      doneList: mockData.todos.filter((todo) => todo.isDone),
    });
  }
  handleChange = (evt) => {
    this.setState({ val: evt.target.value });
  };
  handleAdd = () => {
    const newTodo = {
      id: this.state.list.length + 1,
      content: this.state.val,
      isDone: false,
    };
    // mockData.todos.push(newTodo);
    this.setState({ list: [newTodo, ...this.state.list] });
    this.setState({ val: "" });
  };
  // handleClick = () => {
  //   fetch(url, {
  //     method: "POST",
  //     body: JSON.stringify({ content: this.state.val }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((newTask) => {
  //       this.setState({ list: [newTask, ...this.state.list] });
  //       this.setState({ val: "" }); // out of then?
  //     })
  //     .catch((reason) => console.log(reason));
  // };
  //[,{id: 2, content: 'coding'},]
  // handeDel = (id) => {
  //   fetch(url + id, {
  //     method: "DELETE",
  //   })
  //     .then((para) => {
  //       this.setState({
  //         list: this.state.list.filter((task) => id !== task.id),
  //       });
  //     })
  //     .catch((reason) => console.log(reason));
  // };
  handleDel = (id) => {
    this.setState({ list: this.state.list.filter((ele) => ele.id !== id) });
  };
  handleEdit = (todo) => {
    this.setState({ editedLi: todo.id });
  };
  handleSave = (todo) => {
    this.setState({ editedLi: -1, saveInput: "" });
    this.setState({
      list: this.state.list.map((item) => {
        if (item.id !== todo.id) {
          return item;
        } else {
          return { ...item, content: this.state.saveInput };
        }
      }),
    });
    // this.setState({
    //   list: [...this.state.list, { ...todo, content: this.state.saveInput }],
    // });
  };
  handleSaveChange = (e) => {
    this.setState({ saveInput: e.target.value });
  };
  handleMove = (todo) => {
    const newTodo = { ...todo, isDone: !todo.isDone };
    if (todo.isDone) {
      this.setState({
        list: [...this.state.list, newTodo],
        doneList: this.state.doneList.filter((item) => item.id !== todo.id),
      });
    } else {
      this.setState({
        doneList: [...this.state.doneList, newTodo],
        list: this.state.list.filter((item) => item.id !== todo.id),
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <h1>To-do Lists</h1>
        <input
          type="text"
          value={this.state.val}
          onChange={this.handleChange}
        />
        <button onClick={this.handleAdd}>Add</button>
        <div>
          <ul style={{ listStyle: "none" }}>
            {this.state.list.map((task, index) => (
              <li id={task.id} key={task.id}>
                {this.state.editedLi !== task.id && (
                  <>
                    <span>{task.content}</span>
                    <button onClick={() => this.handleEdit(task)}>Edit</button>
                  </>
                )}
                {this.state.editedLi === task.id && (
                  <>
                    <input
                      value={this.state.saveInput}
                      onChange={this.handleSaveChange}
                    />
                    <button onClick={() => this.handleSave(task)}>Save</button>
                  </>
                )}
                <button onClick={() => this.handleDel(task.id)}>Delete</button>
                <button onClick={() => this.handleMove(task)}>Move</button>
              </li>
            ))}
          </ul>
          {!this.state.list.length && <div>no tasks to do</div>}
        </div>
        <div className="done-list">
          <h2>Already Done</h2>
          <ul style={{ listStyle: "none" }}>
            {this.state.doneList.map((task, index) => (
              <li id={task.id} key={task.id}>
                {this.state.editedLi !== task.id && (
                  <>
                    <span>{task.content}</span>
                    <button onClick={() => this.handleEdit(task)}>Edit</button>
                  </>
                )}
                {this.state.editedLi === task.id && (
                  <>
                    <input
                      value={this.state.saveInput}
                      onChange={this.handleSaveChange}
                    />
                    <button onClick={() => this.handleSave(task)}>Save</button>
                  </>
                )}
                <button onClick={() => this.handleDel(task.id)}>Delete</button>
                <button onClick={() => this.handleMove(task)}>Move</button>
              </li>
            ))}
          </ul>
          {!this.state.doneList.length && <div>nothing</div>}
        </div>
      </React.Fragment>
    );
  }
}
// style={{ display: this.state.isShowInput ? "inline" : "none" }}
