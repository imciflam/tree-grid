import React, { Component } from "react"
import axios from "axios"
import Attribute from "./components/Attribute"
import Child from "./components/Child"
import Parent from "./components/Parent"

export class App extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = { data: [] }
  }

  renderCurrent(data: any) {
    if (data && data.length !== 0) {
      let result = []
      for (let element in data) {
        switch (element) {
          case "Parent":
            result.push(<Parent data={data[element]} />) // bracket notation, because it's variable
            break
          case "Child":
            result.push(<Child data={data[element]} />)
            break
          case "Attribute":
            result.push(<Attribute data={data[element]} />)
            break
          default:
            result.push(<div>unknown</div>)
            break
        }
      }
      return result
    }
  }

  public componentDidMount() {
    axios.get("1.json").then(response => {
      this.setState({ data: response.data.Entity.Fields })
      localStorage.setItem(
        response.data.Entity._Name,
        JSON.stringify(response.data.Entity)
      )
    })
  }
  render() {
    return (
      <React.Fragment>{this.renderCurrent(this.state.data)}</React.Fragment>
    )
  }
}

export default App
