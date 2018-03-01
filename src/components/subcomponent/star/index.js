import React,{Component}from 'react'
import './index.css';
class Star extends Component {
    constructor(props){
        super(props)
        this.state = {
            starArr:[1,2,3],
            halfStar:false
        }       
    }
    getStar(){
        let count = Math.floor(this.props.value);
        let Arr = [];
        for (let i = 0; i <count; i++) {
            Arr.push(i);
            if(this.props.value===i){
                Arr.push(i);
            }
            if(count===(i+1)&&this.props.value!==(i+1)) {  
                              
                this.setState({halfStar:true})              
            }        
        }      
        this.setState({starArr:Arr})
    }
    componentWillMount(){
        this.getStar();
    }
    render(){
        return(
            <div>
                {this.state.starArr.map(val=>(
                    <span key={val} className="star"></span>                   
                ))}
                {this.state.halfStar?
                    <span className="halfstar"></span>
                    :null}
                    <span className="text"> {this.props.value}分</span>
            </div>
        )
    }
}
export default Star;
 