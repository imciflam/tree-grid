import React, { Component } from "react"
import axios from "axios"

export class App extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { data: [] }
  }
  public componentDidMount() {
    axios.get("1.json").then(response => {
      console.log(response.data)
    })
  }
  render() {
    return <React.Fragment>placeholder</React.Fragment>
  }
}

export default App
