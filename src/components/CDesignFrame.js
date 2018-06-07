import React, { PureComponent } from 'react';
import { getComponentFromId } from '../figmaComponents';
import { workers } from '../content';
export class CDesignFrame extends PureComponent {
  state={}

  render() {
    const Component = getComponentFromId(this.props.nodeId);
    if(workers.length) {
      return workers.map((item) => 
        {
          let value = {
            "logo": item.logo,
            "price": item.price,
            "date": item.date,
            "user": item.user,
            "special": item.special,
            "market": item.market
                }
          return <div style={{position: "relative"}} key={item.price}>
            <Component {...this.props} {...value} item={item}/>
          </div>
        })
    } else {
      return <Component {...this.props} {...this.state}/>
    }
  }
}
