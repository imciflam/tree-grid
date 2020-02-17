import React, { Component } from "react"
import "./TreeList.css"
const TreeListItem = React.lazy(() => import("./TreeListItem"))

export class TreeList extends Component<any, any> {
  render() {
    const data = this.props.data
    return (
      <div className='tree-list__container'>
        {data.map((item: any) => (
          <React.Suspense key={item.id} fallback={<p> Loading...</p>}>
            <TreeListItem
              className='tree-list__item'
              key={item.id}
              id={item.id}
              name={item.name}
              parentId={item.parentId}
            />
          </React.Suspense>
        ))}
      </div>
    )
  }
}

export default TreeList
