import React,{Component}from 'react'
import { Carousel} from 'antd-mobile'
import AnimatedWrapper from "../animate/animate"
import {Link} from 'react-router-dom'
import axios from 'axios';
import {Toast} from 'antd-mobile'


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
      data: ['1', '2', '3','4'],
      category:[],
      imgHeight: 176,
      slideIndex: 0,
      id:'',
      title:[],
      isBack:false
    };
    this.get = this.get.bind(this);
  }
  get(){
    let url = `${window.hostName}/booklist`
    axios.get(url).then((res)=>{
      Toast.loading('Loading...', 0.5, () => {
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

    componentDidMount() {
      // simulate img loading     
        this.setState({
          data: [img1, img2, img3,img4,img5],        
        });
      this.get();
    }
    render(){     
        return (
            <div className="page">
                <Carousel autoplay={true} infinite dots={true} selectedIndex={0} >
                  {this.state.data.map(val => (
                    <a 
                    key={val}
                    href="http://www.alipay.com"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                      <img
                        src={val}
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
                {this.state.category[0]?
               <div className="content">
                  {this.state.title.map((val,index)=>(
                    <section className="container" key={val}>
                    <nav>
                      <h3>{val}</h3>
                    </nav>                  
                      <ul className="list" >
                        {this.state.category[index].map((val,index)=>(
                          <li key={index}>
                          <Link to={{pathname:`/booklist/${val.id}`,state:val.id}}>
                          <img className="cover" src={val.images} alt=""/>
                          <p>{val.name}</p>
                          <p>{val.author}</p>
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