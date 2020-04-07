import React, { Component } from "react";
import Attribute from "./components/Attribute";
import Children from "./components/Children";
import Parent from "./components/Parent";
import storeInterface from "./components/storeInterface";
export class App extends Component<{}, any> implements storeInterface {
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

  fetchEntity = (filename: string) => {
    import(`${filename}`).then(GENERIC_REPORT => {
      this.setState({ data: GENERIC_REPORT.Entity.Fields });
      localStorage.setItem(
        GENERIC_REPORT.Entity._Name,
        JSON.stringify(GENERIC_REPORT.Entity)
      );
      this.setState({ data: GENERIC_REPORT.Entity });
    });
  };

  checkForCachedEntity = (entityName: string) => {
    let entity = localStorage.getItem(entityName);
    if (!entity) {
      return false;
    } else {
      let parsedData = JSON.parse(entity);
      return parsedData.Fields;
    }
  };

  public componentDidMount() {
    const result = this.checkForCachedEntity("GENERIC_REPORT");
    if (!result) {
      this.fetchEntity("./GENERIC_REPORT.json");
    } else {
      this.setState({ data: result });
    }
  }

  render() {
    return (
      <React.Fragment>{this.renderCurrent(this.state.data)}</React.Fragment>
    );
  }
}

export default App;
