import React, { Component } from "react";
import Attribute from "./components/Attribute";
import Children from "./components/Children";
import Parent from "./components/Parent";

export class App extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = { data: false };
  }

  renderCurrent = (data: any) => {
    if (data) {
      const result = [];
      for (const [index, [element, value]] of Object.entries(
        Object.entries(data)
      )) {
        switch (element) {
          case "Parent":
            result.push(<Parent data={value} key={index} />); // bracket notation, because it's a variable
            break;
          case "Child":
            result.push(<Children data={value} key={index} />);
            break;
          case "Attribute":
            result.push(<Attribute data={value} key={index} />);
            break;
          default:
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
