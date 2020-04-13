import React from "react";
import Tree from "./components/Tree";
import globalStoreObject from "./globalStoreObject";

export class App extends React.Component {
  render() {
    return <Tree {...globalStoreObject} />;
  }
}

export default App;
