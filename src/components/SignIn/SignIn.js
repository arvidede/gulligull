import React, { Component } from "react"
import { withFirebase } from "../Firebase/"

class SignIn extends Component {
    state = {
        username: "",
        password: ""
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.firebase.doSignInWithEmailAndPassword(
            this.state.username,
            this.state.password
        )
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleInputChange}
                    />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default withFirebase(SignIn)
