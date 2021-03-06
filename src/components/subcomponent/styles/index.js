import React,{ Component } from 'react'
import Toast from 'antd-mobile/lib/toast'
import  'antd-mobile/lib/toast/style'
import './index.css'
class Styles extends Component {
  constructor(props){
super(props)
// colorStyle:[{bgColor:'#FFE4C4',color:'#333'},{bgColor:'#FFE4C4',color:'#ffb'},{bgColor:'#FFE4C4',color:'#ffc'},{bgColor:'#FFE4C4',color:'#ffe'}]
   this.state = {
      colorStyle:[{bgColor:'#65BFF4',color:'#333'},{bgColor:'#1FB647',color:'#ffb'},{bgColor:'#008BA2',color:'#ffc'},{bgColor:'#A03403',color:'#fff'}],
      fontSize:20,
      bgcolor:'#FFE4C4',
      color:'#333'
   }
 }
changeColor(colorStyle){
  this.setState({
    bgColor:colorStyle.bgColor
  })
    this.props.callbackParent(colorStyle);
}
reduceSize(fontSize){
  if(fontSize<=16){
    Toast.info('已经到最小了')
    return
  }
  fontSize = this.state.fontSize-2;
  this.props.changeSize(fontSize);
  this.setState({
    fontSize
  })
}
increaseSize(fontSize){
  if(fontSize>=28){
    Toast.info('已经到最大了');
    return
  }
  fontSize = this.state.fontSize+2;
  this.props.changeSize(fontSize);
  this.setState({
    fontSize
  })
}
 render(){
   
 return(
 <div style={{
   backgroundColor:this.props.changeColor?this.props.changeColor.bgColor:this.state.bgColor,
   color:this.props.changeColor?this.props.changeColor.color:this.state.color
   }} className={
     this.props.showStyle?"style-container active":"style-container"
     }>
      <div className="fontsize">
      <h4>调整字体大小</h4>
        <span
        style={{
          backgroundColor:this.props.changeColor?this.props.changeColor.bgColor:this.state.bgColor,
          color:this.props.changeColor?this.props.changeColor.color:this.state.color
          }}
         onClick={this.reduceSize.bind(this,this.state.fontSize)}>小</span>
        <span
        style={{
          backgroundColor:this.props.changeColor?this.props.changeColor.bgColor:this.state.bgColor,
          color:this.props.changeColor?this.props.changeColor.color:this.state.color
          }}
         onClick={this.increaseSize.bind(this,this.state.fontSize)}>大</span>
      </div>
      <div className="bgcolor">
      <h4>更换背景</h4>
        {this.state.colorStyle.map(val=>(
          <span  onClick={this.changeColor.bind(this,val)} style={{backgroundColor:val.bgColor}}  key={val.bgColor}></span>
        ))}
      </div>
 </div>
 )
 }
}
export default Styles;