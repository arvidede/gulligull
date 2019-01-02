import React, { Component } from "react"
import List from "../TodoList"
import { withFirebase } from "../Firebase/"
import SignIn from "../SignIn/"
import "./App.css"

class App extends Component {
    constructor() {
        super()
        this.state = {
            authUser: JSON.parse(localStorage.getItem("authUser"))
        }
    }

    componentDidMount() {
        this.listener = this.props.firebase.onAuthUserListener(
            authUser => {
                localStorage.setItem("authUser", JSON.stringify(authUser))
                this.setState({ authUser })
            },
            () => {
                localStorage.removeItem("authUser")
                this.setState({ authUser: null })
            }
        )
    }

    componentWillUnmount() {
        this.listener()
    }

    render() {
        const { firebase } = this.props
        return (
            <div className="App">
                {firebase.auth.currentUser ? (
                    <React.Fragment>
                        <header>
                            <button onClick={firebase.doSignOut}>
                                Logga Ut
                            </button>
                        </header>
                        <List />
                    </React.Fragment>
                ) : (
                    <SignIn />
                )}
            </div>
        )
    }
}

export default withFirebase(App)
