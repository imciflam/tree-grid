import React, { Component } from "react";
import Attribute from "./components/Attribute";
import Children from "./components/Children";
import Parent from "./components/Parent";

export class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: [] };
  }

  renderCurrent = (data: any) => {
    if (data && data.length !== 0) {
      let result = [];
      for (let element in data) {
        switch (element) {
          case "Parent":
            result.push(<Parent data={data[element]} />); // bracket notation, because it's variable
            break;
          case "Child":
            result.push(<Children data={data[element]} />);
            break;
          case "Attribute":
            result.push(<Attribute data={data[element]} />);
            break;
          default:
            result.push(<div>unknown</div>);
            break;
        }
      }
      return result;
    }
  };

  public componentDidMount() {
    import("./GENERIC_REPORT.json").then(response => {
      this.setState({ data: response.Entity.Fields });
      localStorage.setItem(
        response.Entity._Name,
        JSON.stringify(response.Entity)
      );
    });
  }
  render() {
    return (
      <React.Fragment>{this.renderCurrent(this.state.data)}</React.Fragment>
    );
  }
}

export default App;
