import React, { Component } from "react"
import TreeList from "./components/TreeList"
import axios from "axios"

export class App extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { data: [] }
  }
  public componentDidMount() {
    axios
      .get("http://5e4a36256eafb7001488c115.mockapi.io/elements")
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
  render() {
    console.log(this.state)
    return (
      <React.Fragment>
        <TreeList className='tree-list' data={this.state.data} />
      </React.Fragment>
    )
  }
}

export default App
