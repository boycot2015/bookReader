import React,{Component} from 'react'
import AnimatedWrapper from "../animate/animate"
import {Tabs,Toast} from 'antd-mobile'
import {Link} from 'react-router-dom'
import axios from 'axios';
import './index.css';



const tabs = [
  { title: '玄幻', sub: '1' },
  { title: '修真', sub: '2' },
  { title: '历史', sub: '3' },
  { title: '游戏', sub: '4' },
];

class CategoryComponent extends Component{
  constructor(){
    super();
    this.state = {
      category:[],
      isBack:false
    };
    this.get = this.get.bind(this);
  }
  get(type=1){
    let url = `${window.hostName}/type?type=${type}`
    axios.get(url).then((res)=>{
        Toast.loading('Loading...', 0.5, () => {
            this.setState({category:res.data,isBack:true});
        })
    }).catch((err)=>{
        console.log(err.status);
    })
  }
 
    componentDidMount() {
      this.get();            
    }
    render(){     
        return(
            <div className="page">
                <Tabs tabs={tabs}
                  initialPage={0}
                  renderTab={tab =><div><i></i><span>{tab.title}</span></div>}
                  onChange={(models,index)=>{  
                    this.setState({category:[]});                  
                    this.get(index+1);                   
                  }}
                >              
                {this.state.category?
                <div style={{ display: 'flex', alignItems: 'center',flexWrap:'wrap', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                    {this.state.category.map((val,index)=>(
                      <Link key={val.id} to={{pathname:`/booklist/${val.id}`,state: `${val.id}`}}  style={{float:'left',width:'48%',margin: '0 1%',}}>
                      <img className="cover" src={val.images} alt=""/>
                      <p>{val.name}</p>
                      <p>{val.author}</p>
                    </Link>
                    ))}                    
                </div>
              :null}              
              </Tabs>
            </div>
        )
    }
}
const Category = AnimatedWrapper(CategoryComponent);
export default Category;