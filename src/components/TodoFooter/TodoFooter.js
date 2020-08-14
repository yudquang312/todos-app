import React, { Component } from "react";

export default class TodoFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                all: true,
                active: false,
                completed: false,
            },
        };
    }

    render() {
        let {
            itemsLeft,
            // onViewItem,
            itemsCompleted,
            onClearCompleted,
        } = this.props;
        let { filter } = this.state;
        return (
            <div className="todo-footer">
                <span>{itemsLeft} items left</span>
                <ul className="todo-filter">
                    <li
                        className={filter.all ? "filter-active" : ""}
                        onClick={() => this.onClick("all")}
                    >
                        All
                    </li>
                    <li
                        className={filter.active ? "filter-active" : ""}
                        onClick={() => this.onClick("active")}
                    >
                        Active
                    </li>
                    <li
                        className={filter.completed ? "filter-active" : ""}
                        onClick={() => this.onClick("completed")}
                    >
                        Completed
                    </li>
                </ul>
                <button
                    className={itemsCompleted ? "" : "hidden"}
                    onClick={() => onClearCompleted()}
                >
                    Clear Completed
                </button>
            </div>
        );
    }

    onClick = (viewActive) => {
        console.log(viewActive);
        let { filter } = this.state;
        console.log(filter);
        for (let view in filter) {
            filter[view] = false;
        }
        filter[viewActive] = true;
        console.log(filter);
        this.setState({
            filter,
        });
        this.props.onViewItem(viewActive);
    };
}
