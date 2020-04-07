import React, { Component } from "react";
import Attribute from "./components/Attribute";
import Children from "./components/Children";
import Parent from "./components/Parent";
import storeInterface from "./components/storeInterface";
export class App extends Component<{}, any> implements storeInterface {
  constructor(props: any) {
    super(props);
    this.state = { data: false, globalStore: {} };
  }

  callbackFunction = (childName: string, childData: string) => {
    const globalStore = { ...this.state.globalStore };
    globalStore[childName] = childData;
    this.setState({ globalStore });
  };

  renderCurrent = (data: any) => {
    if (data) {
      const result = [];
      for (const [index, [element, value]] of Object.entries(
        Object.entries(data)
      )) {
        switch (element) {
          case "Parent":
            result.push(
              <Parent
                data={value}
                key={index}
                globalStore={this.state.globalStore}
                parentCallback={this.callbackFunction}
              />
            );
            break;
          case "Child":
            result.push(
              <Children
                data={value}
                key={index}
                globalStore={this.state.globalStore}
                parentCallback={this.callbackFunction}
              />
            );
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
      const entityName = JSON.stringify(GENERIC_REPORT["Entity"]["_Name"]);
      const entityData = JSON.stringify(GENERIC_REPORT.Entity);
      const globalStore = { ...this.state.globalStore };
      globalStore[entityName] = entityData;
      this.setState({ globalStore });
    });
  };

  checkForCachedEntity = (entityName: string) => {
    const stringEntityName = JSON.stringify(entityName);
    const entity = this.state.globalStore[stringEntityName];
    if (!entity) {
      return false;
    } else {
      const parsedData = JSON.parse(entity);
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
    console.log(this.state);
    return (
      <React.Fragment>{this.renderCurrent(this.state.data)}</React.Fragment>
    );
  }
}

export default App;
