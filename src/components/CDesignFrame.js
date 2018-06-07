import React, { PureComponent } from 'react';
import { getComponentFromId } from '../figmaComponents';

export class CDesignFrame extends PureComponent {
  state={}

  render() {
    const Component = getComponentFromId(this.props.nodeId);
    if(this.props.listItems.length) {
      console.log('props is', this.props.listItems);
      return this.props.listItems.map((item) => 
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


    // const Component = getComponentFromId(this.props.nodeId);
    // return <Component {...this.props} {...this.state}/>
  }
}
