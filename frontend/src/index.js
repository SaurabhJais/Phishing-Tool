import React from "react"
import ReactDom from "react-dom"
import Home from "./app"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"


ReactDom.render(
    <BrowserRouter>
        <Provider store={store}>
            <Home />
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
)