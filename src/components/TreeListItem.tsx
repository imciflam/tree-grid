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
      })
      .catch((error: any) => {
        console.log(error)
      })

    this.setState({
      showPopup: !this.state.showPopup,
      itemChildData: { name: "mock", parentId: "1" }
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className='tree-list__item'>
        {this.props.parentId == null ? (
          <button onClick={() => this.getChildren(this.props.id)}>></button>
        ) : (
          ""
        )}
        <span className='tree-list__text'>{this.props.name}</span>
        {this.state.showPopup ? (
          <TreeListItem {...this.state.itemChildData} />
        ) : (
          ""
        )}
      </div>
    )
  }
}

export default TreeListItem
