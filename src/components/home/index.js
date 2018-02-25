import React from 'react'
import { Carousel } from 'antd-mobile';
import img1 from '../../images/1.e64fa90.jpg';
import img2 from '../../images/2.3cfb112.jpg';
import img3 from '../../images/3.afa33f3.jpg';
import img4 from '../../images/4.1c9651f.jpg';
import img5 from '../../images/5.5f3df4d.jpg';
import './index.css';
class Home extends React.Component{
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        slideIndex: 0,
        
      }
      componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            data: [img1, img2, img3,img4,img5],
          });
        }, 100);
      }
    render(){
        return(
            <div>
                <Carousel
          autoplay={true}
          infinite
          dots={true}
          selectedIndex={0}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="http://www.alipay.com"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
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
            </div>
        )
    }
}
export default Home;