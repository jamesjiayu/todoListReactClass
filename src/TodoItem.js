import React from "react";
import "./TodoItem.css";

class TodoItem extends React.Component {
  state = {
    inputValue: this.props.task.content,
  };

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    const { task, onDelete, onComplete, onEdit, onSave, isEdit } = this.props;
    return (
      <li className="todoitem">
        {isEdit ? (
          <input value={this.state.inputValue} onChange={this.handleChange} />
        ) : (
          <span className="todoitem-content" onClick={() => onComplete(task)}>
            {task.content}
          </span>
        )}
        <div className="todoitem-btns">
          {isEdit ? (
            <button
              className="btn btn-save"
              onClick={() =>
                onSave({ ...task, content: this.state.inputValue })
              }
            >
              save
            </button>
          ) : (
            <button className="btn btn-edit" onClick={() => onEdit(task.id)}>
              edit
            </button>
          )}
          <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
            delete
          </button>
        </div>
      </li>
    );
  }
}

export default TodoItem;
