import React, { Component } from "react";
import "./TreeListItem.css";
import axios from "axios";

export class TreeListItem extends Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      showPopup: false,
      itemChildData: []
    };
  }

  public getChildren(id: number) {
    axios
      .get(`https://5e4a36256eafb7001488c115.mockapi.io/elements`)
      .then(response => {
        const childData = response.data.filter(
          (element: any) => element.parentId === id
        );
        this.setState({
          showPopup: !this.state.showPopup,
          itemChildData: childData
        });
        if (childData.length === 0) {
          alert("this item has no children");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="tree-list__item">
        <button
          className="tree-list__button"
          onClick={() => this.getChildren(this.props.id)}
        >
          ⮡
        </button>
        <span className="tree-list__text">{this.props.name}</span>
        {this.state.showPopup && this.state.itemChildData
          ? this.state.itemChildData.map((element: any) => {
              return (
                <TreeListItem
                  className="tree-list__item"
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  parentId={element.parentId}
                />
              );
            })
          : ""}
      </div>
    );
  }
}

export default TreeListItem;
