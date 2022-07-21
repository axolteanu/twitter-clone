import React from 'react';
import './TextInput.css';

export class TextInput extends React.Component{
  constructor(props){
    super(props);
    this.inputWrapper = React.createRef();
    this.input = React.createRef();
  }

  componentDidMount(){
    this.input.current.addEventListener('focusin', (e) => {
      let elem = e.target.parentElement.children[1];
      elem.style.top = '10px';
      elem.style.fontSize = '13px';
      elem.style.color = 'rgb(29,155,240)';
    });
    this.inputWrapper.current.addEventListener('focusout', (e) => {
      let elem = e.target.parentElement.children[1];
      if(e.target.parentElement.children[0].value === ''){
        elem.style.top = '20px';
        elem.style.fontSize = '18px';
      }
      elem.style.color = 'rgb(72,72,72)';
    });
  }

  render(){
    return (
      <div ref={this.inputWrapper} className="text-input-wrapper">
        <input ref={this.input} name={this.props.name} type={this.props.type}/>
        <label>{this.props.label}</label>
      </div>
    );
  }
}