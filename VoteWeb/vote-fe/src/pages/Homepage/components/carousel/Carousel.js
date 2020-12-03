import React from 'react'
import { Carousel, Row, Col } from 'antd';

import './Carousel.less'
import HomeCreateVote from './HomeCreateVote.js'

import store from '../../../../redux/configureStore'
import { getCarousel } from '../../../../redux/action/actionCreators.js'

class CarouselContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState();
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange);
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  componentDidMount() {
    const action = getCarousel(this.props.path)
    store.dispatch(action)
  }
  render() {
    return (
      <Row justify="space-between" className="carousel-container">
        <Col span={18}>
          <Carousel autoplay className="carousel">
            {this.state.carousel ? this.state.carousel.map((it, id) => {
              return <div key={id} className="imge"><a scr="/"><img src={it} /></a></div>
            })
              : ''
            }
          </Carousel>
        </Col>
        <Col span={1}></Col>
        <Col span={5}><HomeCreateVote /></Col>
      </Row>
    )
  }
}

export default CarouselContainer;