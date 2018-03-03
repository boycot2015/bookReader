import React,{ Component } from 'react'
class Userinfo extends Component {
  constructor(props){
super(props)
   this.state = {
    userData:'未登录，请先登录！'
   }
 }
 componentWillMount(){
     let userData = window.sessionStorage.getItem('user');
    if(userData){
        this.setState({userData})
    }
 }
 componentDidMount(){

 }
 componentWillUnmount(){
 }
 render(){
 return(
 <div>
    <h2>{this.state.userData}</h2>
 </div>
 )
 }
}
export default Userinfo;