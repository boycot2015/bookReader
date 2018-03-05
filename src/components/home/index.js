import React,{Component}from 'react'
import { Carousel} from 'antd-mobile'
import AnimatedWrapper from "../animate/animate"
import {Link} from 'react-router-dom'
import axios from 'axios';
import {Toast} from 'antd-mobile'
import PubSub from 'pubsub-js'


import img1 from '../../images/1.e64fa90.jpg';
import img2 from '../../images/2.3cfb112.jpg';
import img3 from '../../images/3.afa33f3.jpg';
import img4 from '../../images/4.1c9651f.jpg';
import img5 from '../../images/5.5f3df4d.jpg';
import './index.css';

class HomeComponent extends Component{
  constructor(){
    super();
    this.state = {
      data: [{images:img1},{images:img2},{images:img3},{images:img4},{images:img5}],
      category:[],
      imgHeight: 176,
      slideIndex: 0,
      id:'',
      title:[],
      isBack:false,
      headerTitle:'详情'
    };
    this.get = this.get.bind(this);
  }
  get(){
    let url = `${window.hostName}/booklist`
    axios.get(url).then((res)=>{
      Toast.loading('Loading...', 0.8, () => {             
        this.setState({category:[
          res.data.slice(0,8),
          res.data.slice(8,16),
          res.data.slice(16,24),
          res.data.slice(24,32)],
          title:['热门推荐','排行榜','限时免费','新书抢先'],
          isBack:true
          });
      });     
      
    }).catch((err)=>{
        console.log(err.status);
    })
  }
  getBannerData(){
    let url = `${window.hostName}/banner`
    axios.get(url).then((res)=>{
        this.setState({data:res.data}); 
        this.get();         
    }).catch((err)=>{
        console.log(err.status);
    })
  }  
  onclick(headerTitle){  
    //通过PubSub库发布信息  
    PubSub.publish('headerTitle',headerTitle);  
  }
    componentWillMount() {  
      this.get();      
      // this.getBannerData()
    }
    render(){     
        return (
            <div className="page">              
                {this.state.category[0]?               
               <div className="content">
               <Carousel autoplay={true} infinite dots={true} 
               dotActiveStyle={{width:30,height:4,borderRadius: 0,backgroundColor:'red'}}
                dotStyle={{width:30,height:4,borderRadius: 0}} 
                selectedIndex={0} >
                  {this.state.data.map(val => (
                    <a 
                    key={val}
                    href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                      <img
                        src={val.images}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                          // fire window resize event to change height
                          window.dispatchEvent(new Event('resize'));
                          this.setState({ imgHeight: 'auto' });
                        }}
                      />
                    </a>
                  ))}
                </Carousel>
                  {this.state.title.map((val,index)=>(
                    <section className="container" key={val}>
                    <nav>
                      <h3>{val}</h3>
                    </nav>                  
                      <ul className="list" >
                        {this.state.category[index].map((val,index)=>(
                          <li key={index}>
                          <Link to={{pathname:`/booklist/${val.id}`,state:val.id}} onClick={()=>{this.onclick(this.state.headerTitle)}} >
                          <img  className="cover" src={val.images} alt=""/>
                          <p>{val.name}</p>
                          <span>{val.author}</span>
                          </Link>
                        </li>
                        ))}  
                      </ul>                  
                  </section>
                  ))}
               </div> 
               :null}
            </div>
        )
    }
}
const Home = AnimatedWrapper(HomeComponent);
export default Home;