import React,{Component} from 'react'
import AnimatedWrapper from "../animate/animate";
class TopComponent extends Component{
   
    render(){
        return(
            <div className="page">
                <h2>我是排行</h2>
            </div>
        )
    }
}
const Top = AnimatedWrapper(TopComponent);
export default Top;