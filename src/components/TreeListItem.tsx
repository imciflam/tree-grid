import React, { Component } from "react"
import "./TreeListItem.css"
import axios from "axios"

export class TreeListItem extends Component<any, any> {
  public constructor(props: any) {
    super(props)
    this.state = {
      showPopup: false,
      itemChildData: []
    }
  }

  public getChildren(id: number) {
    console.log(id)
    //get elements for which current id == parent id
    axios
      .get(`http://5e4a36256eafb7001488c115.mockapi.io/elements/${id}`)
      .then(response => {
        const childData = response.data
        console.log(childData)
        this.setState({
          showPopup: !this.state.showPopup,
          itemChildData: childData
        })
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='tree-list__item'>
        {this.props.parentId == null ? (
          <button onClick={() => this.getChildren(this.props.id)}>></button>
        ) : (
          ""
        )}
        <span className='tree-list__text'>{this.props.name}</span>
        {this.state.showPopup && this.state.itemChildData
          ? this.state.itemChildData.map((element: any) => {
              return (
                <TreeListItem
                  className='tree-list__item'
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  parentId={element.parentId}
                />
              )
            })
          : ""}
      </div>
    )
  }
}

export default TreeListItem
