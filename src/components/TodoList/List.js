import React, { Component } from "react"
import { withFirebase } from "../Firebase/"
import "./List.css"

class List extends Component {
    state = {
        todos: [],
        inputValue: ""
    }

    componentDidMount() {
        this.props.firebase
            .doGetList()
            .then(doc => this.setState({ todos: doc.data().list }))

        this.props.firebase.doSubscribe(todos => this.setState({ todos }))
    }

    handleNewTodo = event => {
        event.preventDefault()
        const { inputValue } = this.state
        if (inputValue.length > 0) {
            this.setState({ inputValue: "" })
            this.props.firebase.doAddNewTodo(inputValue)
        }
    }

    handleRemoveTodo = index => {
        const { todos } = this.state
        this.props.firebase.doRemoveTodo(todos[index])
    }

    render() {
        const { todos, inputValue } = this.state
        return (
            <div className="list-container">
                <h1>Saker Att Göra Medan Man Pussas</h1>
                <form onSubmit={this.handleNewTodo}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e =>
                            this.setState({ inputValue: e.target.value })
                        }
                    />
                    <input type="submit" value="+"/>
                </form>
                <div className="list">
                    <ul>
                        {todos.map((todo, index) => (
                            <li key={index}>
                                <span>{todo}</span>
                                <button
                                    onClick={() => this.handleRemoveTodo(index)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default withFirebase(List)
