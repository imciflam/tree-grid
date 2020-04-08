import React, { Component } from "react";
import Attribute from "./components/Attribute";
import storeInterface from "./components/storeInterface";
import globalStoreObject from "./components/globalStoreObject";
import TreeNode from "./components/TreeNode";

export class App extends Component<{}, any> implements storeInterface {
  constructor(props: any) {
    super(props);
    this.state = { data: false, globalStore: globalStoreObject };
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
        if (element === "Parent") {
          if (typeof value === "object") {
            result.push(
              <TreeNode
                {...value}
                key={index}
                globalStore={this.state.globalStore}
                parentCallback={this.callbackFunction}
                componentType="parent"
              />
            );
          }
        } else if (element === "Child") {
          (value as []).forEach((element: object) => {
            result.push(
              <TreeNode
                {...element}
                globalStore={this.state.globalStore}
                parentCallback={this.callbackFunction}
                componentType="child"
              />
            );
          });
        } else if (element === "Attribute") {
          (value as []).forEach((element: object) => {
            result.push(<Attribute {...element} />);
          });
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
    return (
      <React.Fragment>{this.renderCurrent(this.state.data)}</React.Fragment>
    );
  }
}

export default App;
