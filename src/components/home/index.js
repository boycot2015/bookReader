import React from 'react'
import { Carousel,Tabs,Toast} from 'antd-mobile';
import axios from 'axios';


import img1 from '../../images/1.e64fa90.jpg';
import img2 from '../../images/2.3cfb112.jpg';
import img3 from '../../images/3.afa33f3.jpg';
import img4 from '../../images/4.1c9651f.jpg';
import img5 from '../../images/5.5f3df4d.jpg';
import './index.css';



const tabs = [
  { title: '玄幻', sub: '1' },
  { title: '修真', sub: '2' },
  { title: '历史', sub: '3' },
  { title: '游戏', sub: '4' },
];

class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      data: ['1', '2', '3','4'],
      category:[],
      imgHeight: 176,
      slideIndex: 0,
    };
    this.get = this.get.bind(this);
  }
  get(type=1){
    let url = `${window.hostName}/type?type=${type}`
    axios.get(url).then((res)=>{
      this.setState({category:res.data});
    }).catch((err)=>{
        console.log(err.status);
    })
  }
  loadingToast(index) {
    // console.log(index);
    this.index = index;
    Toast.loading('Loading...', 0.5, () => {
      this.get(this.index+1);
    });
  }
    componentDidMount() {
      // simulate img loading
      
        this.setState({
          data: [img1, img2, img3,img4,img5],        
        });
      this.get();
             
    }
    render(){
      
        return(
            <div>
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
                <Tabs tabs={tabs}
                  initialPage={0}
                  renderTab={tab =><div><i></i><span>{tab.title}</span></div>}
                  onChange={(models,index)=>{  
                    this.setState({category:[]});                  
                    this.loadingToast(index);                   
                  }}
                >              
                {this.state.category?
                <div style={{ display: 'flex', alignItems: 'center',flexWrap:'wrap', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
                    {this.state.category.map((val,index)=>(
                      <a key={val.id} style={{float:'left',width:'48%',margin: '0 1%',}}>
                      <img className="cover" src={val.images} alt=""/>
                      <p>{val.name}</p>
                      <p>{val.author}</p>
                    </a>
                    ))}                    
                </div>
              :null}
                
              </Tabs>
            </div>
        )
    }
}
export default Home;