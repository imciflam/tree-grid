import React, { Component } from "react"
import TreeList from "./components/TreeList"
import data from "./Storage"

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <TreeList data={data} />
      </React.Fragment>
    )
  }
}

export default App
