import React,{Component} from 'react'
import AnimatedWrapper from "../animate/animate";
class UserComponent extends Component{
   
    render(){
        return(
            <div className="page">
                <h2>我是用户</h2>
            </div>
        )
    }
}
const User = AnimatedWrapper(UserComponent);
export default User;