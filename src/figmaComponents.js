import React, { PureComponent } from 'react';
import { CDesignFrame } from './components/CDesignFrame';

export class MasterDesignFrame extends PureComponent {
  render() {
    return <div className="master" style={{backgroundColor: "rgba(255, 255, 255, 1)"}}>
      <CDesignFrame {...this.props} nodeId="1:2" />
    </div>
  }
}

export function getComponentFromId(id) {
  if (id === "1:2") return CDesignFrame1D2;
  return null;
}

class CDesignFrame1D2 extends PureComponent {
  render() {
    return (
      <div>
        <div style={{"zIndex":6}} className="outerDiv">
          <div
            id="22:10"
            style={{"width":"100%","marginLeft":"0%","height":null,"marginTop":0,"marginBottom":105,"minHeight":2}}
            className="innerDiv"
          >
            <div className="vector" dangerouslySetInnerHTML={{__html: `<svg preserveAspectRatio="none" width="1050" height="2" viewBox="0 0 1050 2" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H1050V2H0V0Z" fill="#E5E5E5"/>
</svg>
`}} />
          </div>
        </div>
        <div style={{}} className="outerDiv">
          <div
            id="22:2"
            style={{"marginLeft":90,"width":256,"minWidth":256,"height":null,"marginTop":-77,"marginBottom":53,"minHeight":24,"color":"rgba(0, 0, 0, 1)","fontSize":20,"fontWeight":400,"fontFamily":"Roboto","textAlign":"LEFT","fontStyle":"normal","lineHeight":"125%","letterSpacing":"0px"}}
            className="innerDiv"
          >
            <div>
              {this.props.market && this.props.market.split("\n").map((line, idx) => <div key={idx}>{line}</div>)}
              {!this.props.market && (<div>
                <span style={{}} key="end">MarketName</span>
              </div>)}
            </div>
          </div>
        </div>
        <div style={{"zIndex":5}} className="outerDiv">
          <div
            id="22:12"
            style={{"marginLeft":32,"width":38,"minWidth":38,"height":null,"marginTop":-77,"marginBottom":35,"minHeight":42,"color":"rgba(0, 0, 0, 1)","fontSize":37,"fontWeight":400,"fontFamily":"Roboto","textAlign":"CENTER","fontStyle":"normal","lineHeight":"125%","letterSpacing":"0px"}}
            className="innerDiv"
          >
            <div>
              {this.props.logo && this.props.logo.split("\n").map((line, idx) => <div key={idx}>{line}</div>)}
              {!this.props.logo && (<div>
                <span style={{}} key="end">😍</span>
              </div>)}
            </div>
          </div>
        </div>
        <div style={{"zIndex":2}} className="outerDiv">
          <div
            id="22:5"
            style={{"marginLeft":363,"width":267,"minWidth":267,"height":null,"marginTop":-69,"marginBottom":45,"minHeight":24,"color":"rgba(248, 13, 13, 1)","fontSize":20,"fontWeight":400,"fontFamily":"Roboto","textAlign":"LEFT","fontStyle":"normal","lineHeight":"125%","letterSpacing":"0px"}}
            className="innerDiv"
          >
            <div>
              {this.props.user && this.props.user.split("\n").map((line, idx) => <div key={idx}>{line}</div>)}
              {!this.props.user && (<div>
                <span style={{}} key="end">FirstName LastName</span>
              </div>)}
            </div>
          </div>
        </div>
        <div style={{"zIndex":3}} className="outerDiv">
          <div
            id="22:6"
            style={{"marginLeft":736,"width":198,"minWidth":198,"height":null,"marginTop":-67,"marginBottom":43,"minHeight":24,"color":"rgba(30, 36, 206, 1)","fontSize":20,"fontWeight":400,"fontFamily":"Roboto","textAlign":"LEFT","fontStyle":"normal","lineHeight":"125%","letterSpacing":"0px"}}
            className="innerDiv"
          >
            <div>
              {this.props.date && this.props.date.split("\n").map((line, idx) => <div key={idx}>{line}</div>)}
              {!this.props.date && (<div>
                <span style={{}} key="end">Feb, 12, 2018</span>
              </div>)}
            </div>
          </div>
        </div>
        <div style={{"zIndex":4,"justifyContent":"flex-end"}} className="outerDiv">
          <div
            id="22:7"
            style={{"marginRight":30,"width":198,"minWidth":198,"height":null,"marginTop":-66.5,"marginBottom":42.5,"minHeight":24,"color":"rgba(2, 16, 35, 1)","fontSize":20,"fontWeight":400,"fontFamily":"Roboto","textAlign":"RIGHT","fontStyle":"normal","lineHeight":"125%","letterSpacing":"0px"}}
            className="innerDiv"
          >
            <div>
              {this.props.price && this.props.price.split("\n").map((line, idx) => <div key={idx}>{line}</div>)}
              {!this.props.price && (<div>
                <span style={{}} key="end">− 13,88 USD</span>
              </div>)}
            </div>
          </div>
        </div>
        <div style={{"zIndex":1}} className="outerDiv">
          <div
            id="22:3"
            style={{"marginLeft":90,"width":256,"minWidth":256,"height":null,"marginTop":-50,"marginBottom":32,"minHeight":18,"color":"rgba(153, 159, 168, 1)","fontSize":15,"fontWeight":400,"fontFamily":"Roboto","textAlign":"LEFT","fontStyle":"normal","lineHeight":"125%","letterSpacing":"0px"}}
            className="innerDiv"
          >
            <div>
              {this.props.special && this.props.special.split("\n").map((line, idx) => <div key={idx}>{line}</div>)}
              {!this.props.special && (<div>
                <span style={{}} key="end">Specialization</span>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

