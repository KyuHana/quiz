import React, {Component} from 'react';
import { Input, Button, Progress, Divider } from 'antd';
import {level1} from '../datas'

class Level1 extends Component {

  state = {
    value: '',
    timeOut: false,
    round: 0,
    timer: 10,
    randomTense: '',
    wrongAnswer: '',
    wrongAnswers: []
  }

  componentDidMount() {
    this.randomTense();
    this.startTimeOut();
  }

  randomTense = async() => {
    let TenseArray = ['simple', 'past'];

    //we need to get one tense between simple and past randomly
    let randomTense = await TenseArray[Math.floor(Math.random() * TenseArray.length)];
    this.setState({
      randomTense: randomTense
    })
    
  }

  startTimeOut = () => {
    this.timeOut = setTimeout(() => {
      this.setState({timeOut: true})
    }, 10000); //10초에 해당함수를 실행한다

    this.interval = setInterval(() => {
      console.log(this.state.timer)
      this.setState({
        timer: this.state.timer -1
      })
    }, 1000) //1초마다 해당함수를 실행시킨다
  }

  componentDidUpdate() {
    if(this.state.timer === 0) {
      clearInterval(this.interval);
    }
  } //만약에 state.timer가 0이라면 이벤트를 수정해 준다 아니면 불필요한 이벤트를 지워준다

  componentWillUnmount() {
    clearInterval(this.interval);
    clearTimeout(this.timeOut);
  } //component가 없어지면 컴포넌트를 렌더링 했을때 실행한 이벤트들을 지워줘야한다

  handleRestart = () => {
    //다시 타이머를 초기화 해준다
    this.setState({timeOut: true, timer: 10, wrongAnswer: '' });
    
    //트리거를 다시 걸어주어 시간을 흘러가게 해준다
    this.startTimeOut();
  };

  handleChange = (event) => {
    this.setState({value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.timeOut) return alert('Please click restart button to keep doing again');
    if(!this.state.value.trim()) return alert('Please Type something first');
    this.setState({value: "", wrongAnswer: ""});
    this.checkMatched();
  }

  checkMatched = () => {
    
  }

  render() {
    return(
      <div style={{ padding: '1rem', border: '1px solid grey', borderRadius: '4px', maxWidth: 400, margin: '3rem auto'}}>
        <h1>Vocabulary Game</h1>

        <Progress percent={50} status="active" />

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>Level 1</h2>
          <h2>1/5</h2>
        </div>

        <span style={{marginBottom: 0, color: 'grey'}}>Infinitive</span> 
        <h2>Voca</h2>

        <div style={{ fontSize: '1rem'}}>
          Answer the voca's <span style={{ color: 'red' }}>past participle</span>
        </div>

        <form  style={{ padding: '1rem 0'}} onSubmit={this.handleSubmit}>
          <div style={{display:'flex'}}>
            <Input
              name='value' 
              onChange={this.handleChange}
              value={this.state.value}
              id='voca'
              type='text'
            />
            <Button  //if i dont use antdesign then no need to add OnClick 
              className
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>

        {/* Timer */}
        <div style={{display: 'flex', justifyContent:'space-between'}}>
          <Button  disabled = {this.state.timer <= 8 && true}>5</Button>
          <Button disabled = {this.state.timer <= 6 && true} className={this.state.timer <= 6 && 'disabled'}>4</Button>
          <Button disabled = {this.state.timer <= 4 && true}>3</Button>
          <Button disabled = {this.state.timer <= 2 && true}>2</Button>
          <Button disabled = {this.state.timer <= 0 && true}>1</Button>
          <Button
            onClick={this.handleRestart}
            style={{display: this.state.timeOut ? 'block' : 'none'}}
          >
            Clikc to Restart!
          </Button>
        </div>

        {/*Results */}
        <Divider />
        <h3>Wrong! Correct answer:</h3>
        <div>
          <li style={{display: 'block'}}>
            <p>
              icon answer
            </p>
          </li>
        </div>

        <h1>Reviews the Wrong answers</h1>

        <div>
          <ul>
            <li>
              answer
            </li>
            <li>
              answer
            </li>
          </ul>
        </div>
        <div style={{display: 'flex', justifyContent:'space-evenly'}}>
          <Button>Retry</Button>
          <Button>Level2</Button>
        </div>
      </div>
    )
  }
}

export default Level1;