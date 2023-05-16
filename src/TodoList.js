import React, { Component } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../../APIs/Api";
import { withTodos } from "../../hoc/withTodos";
import TodoItem from "./TodoItem/TodoItem";
class TodolistClass extends Component {
  state = { val: "", isEdit: null }; //list: [],list: this.props.list !!nono
  handleInputChange = (evt) => {
    this.setState({ val: evt.target.value });
  };
  handleSubmit1 = () => {
    const newTask = { content: this.state.val, completed: false };
    this.props.handleSubmit(newTask);
    this.setState({ val: "" });
    // createTodo(newTask).then(newTask => {
    //   this.setState({ list: [newTask, ...this.state.list] })
    //   this.setState({ val: '' }) // out of then?
    // }).catch(reason => console.log(reason))
    // createTodo(newTodo).then((todo) => {    // Gao's
    //   this.setState((prevState) => {
    //     return {
    //       todos: [...prevState.todos, todo],
    //       inputText: "",
    //     }
    //   })
    // })
  };
  handelEdit = (id) => {
    this.setState({ isEdit: id });
  };
  handelSave1 = (task) => {
    this.props.handelSave(task);
    this.setState({ isEdit: null });
    // updateTodo(task).then(data => this.setState(  //return newTask promise
    //   {
    //     isEdit: null,
    //     list: this.state.list.map(item => {
    //       if (data.id === item.id) { return data }
    //       return item
    //     })
    //   }))
  };
  render() {
    const { list, handelDel, handleComplete } = this.props; // const
    const pendingTasks = list.filter((task) => !task.completed);
    const completedTasks = list.filter((task) => task.completed);
    return (
      <div className="todolist">
        <h1>To-do Lists</h1>
        <div className="todolist-form">
          <input
            className="todolist-input"
            type="text"
            value={this.state.val}
            onChange={this.handleInputChange}
          />
          <button className="btn submit-btn" onClick={this.handleSubmit1}>
            submit
          </button>
        </div>
        <div className="todolist-lists">
          <ul className="todolist-list">
            <h4>Pending</h4>
            {pendingTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={handelDel}
                onComplete={() => handleComplete(task)}
                onEdit={this.handelEdit}
                isEdit={task.id === this.state.isEdit} //??????/
                onSave={this.handelSave1}
              ></TodoItem>
            ))}
          </ul>
          {!pendingTasks.length && <div>no tasks to do</div>}
          <ul className="todolist-list">
            <h4>Completed</h4>
            {completedTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onDelete={handelDel}
                onComplete={() => handleComplete(task)}
                onEdit={this.handelEdit}
                isEdit={task.id === this.state.isEdit}
                onSave={this.handelSave1}
              ></TodoItem>
            ))}
          </ul>
          {!completedTasks.length && <div>no tasks to do</div>}
        </div>
      </div>
    );
  }
}

export default withTodos(TodolistClass);
