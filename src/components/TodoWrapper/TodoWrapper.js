import React, { Component } from "react";
import TodoFooter from "../TodoFooter/TodoFooter";
import TodoItem from "../TodoItem/TodoItem";
import todoApp from "../../asset/images/todo-app.svg";

export default class TodoWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: JSON.parse(localStorage.getItem("todo-items"))
                ? JSON.parse(localStorage.getItem("todo-items"))
                : [],
            text: "",
            checkAll: true,
            view: "all",
        };
        this.inputNewItem = React.createRef();
    }

    componentDidUpdate() {
        localStorage.setItem("todo-items", JSON.stringify(this.state.items));
    }

    render() {
        // console.log("render wrapper");
        let { items, checkAll } = this.state;
        let itemsLeft = items.filter((item) => !item.checked).length;
        return (
            <div className="wrapper">
                <div className="todo-header">
                    <span onClick={() => this.checkedAll(checkAll)}>
                        <img src={todoApp} alt=""></img>
                    </span>
                    <input
                        ref={this.inputNewItem}
                        type="text"
                        autoFocus
                        placeholder="What need to be done?"
                        onKeyUp={this.addNewItem}
                    />
                </div>
                <div>
                    <ul className="todo-list">
                        {this.showTodoItem(items, this.state.view)}
                    </ul>
                </div>
                {items.length ? (
                    <TodoFooter
                        itemsLeft={itemsLeft}
                        itemsCompleted={items.length - itemsLeft}
                        onClearCompleted={this.onClearCompleted}
                        onViewItem={this.onViewItem}
                    />
                ) : (
                    ""
                )}
            </div>
        );
    }

    checkedAll = (isChecked) => {
        this.setState((state) => {
            return {
                items: state.items.map((item) => {
                    return { ...item, checked: isChecked };
                }),
                checkAll: !state.checkAll,
            };
        });
        // localStorage.setItem("todo-items", JSON.stringify(this.state.items));
    };

    showTodoItem = (items, view) => {
        let content = [];

        if (view === "all") {
            if (items.length) {
                content = items.map((item, index) => {
                    return (
                        <TodoItem
                            key={index}
                            index={index}
                            content={item.content}
                            checked={item.checked}
                            onChecked={this.onChecked}
                            onDeleted={this.onDeleted}
                            onEditItem={this.onEditItem}
                        />
                    );
                });
            }
        } else {
            if (view === "completed") {
                content = items
                    .filter((item) => item.checked)
                    .map((item, index) => {
                        return (
                            <TodoItem
                                key={index}
                                index={index}
                                content={item.content}
                                checked={item.checked}
                                onChecked={this.onChecked}
                                onDeleted={this.onDeleted}
                                onEditItem={this.onEditItem}
                            />
                        );
                    });
            } else {
                content = items
                    .filter((item) => !item.checked)
                    .map((item, index) => {
                        return (
                            <TodoItem
                                key={index}
                                index={index}
                                content={item.content}
                                checked={item.checked}
                                onChecked={this.onChecked}
                                onDeleted={this.onDeleted}
                                onEditItem={this.onEditItem}
                            />
                        );
                    });
            }
        }

        return content.reverse();
    };

    addNewItem = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            this.setState({
                items: [
                    ...this.state.items,
                    {
                        content: this.inputNewItem.current.value,
                        checked: false,
                    },
                ],
                text: "",
            });
            // localStorage.setItem(
            //     "todo-items",
            //     JSON.stringify(this.state.items)
            // );
            this.inputNewItem.current.value = "";
        }
    };

    onClearCompleted = () => {
        let items = this.state.items;
        items = items.filter((item) => !item.checked);
        this.setState((state) => {
            return {
                items,
            };
        });
        // localStorage.setItem("todo-items", JSON.stringify(this.state.items));
    };

    onChecked = (index) => {
        let items = [...this.state.items];
        items[index].checked = !items[index].checked;
        this.setState((state) => {
            return {
                items,
            };
        });
        // localStorage.setItem("todo-items", JSON.stringify(this.state.items));
    };

    onDeleted = (index) => {
        let items = [...this.state.items];
        items.splice(index, 1);
        this.setState((state) => {
            return {
                items,
            };
        });
        // localStorage.setItem("todo-items", JSON.stringify(this.state.items));
    };

    onViewItem = (view) => {
        this.setState({
            view,
        });
    };

    onEditItem = (index, content) => {
        // console.log(index, content);
        let items = [...this.state.items];
        items[index].content = content;
        this.setState({
            items,
        });
    };
}
