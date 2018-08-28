//当前进展：组件化
import React from './react';
import ReactDOM from './react-dom';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillUpdate() {
    console.log('update');
  }

  componentWillMount(){
    console.log('will mount');
  }

  componentDidMount() {
    console.log('did mount');
  }

  onClick() {
    const num = this.state.num + 1;
    this.setState({
      num 
    });
  }

  render() {
    return <div>
      <h1>num: {this.state.num}</h1>
      <button onClick={this.onClick}>add</button>
    </div>;
  }
}

ReactDOM.render(<div>
  <Welcome name="junlong" />
  <Welcome name="sara" />
  <Welcome name="laurd" />
  <Counter />
</div>, document.getElementById('root'));
