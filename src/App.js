import React from 'react';
import './App.css'

const buttonClass = 'btn btn-block btn-secondary col-md-3'


export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
		
			display: '0',
			flag: false,
			functional: false
		}
	
	}

	addToDisplay = (event) => {
		

		let numberAdd;
		
		if(this.state.flag && !(['+','-','*','/'].some((val) => val == event.target.value))){
			numberAdd = event.target.value;
		}
		
		else if(this.state.display == '0' && ['+','-','*','/'].every((val) => val != event.target.value)){
			numberAdd = event.target.value;
		} else {
			numberAdd = this.state.display + event.target.value;
		}
		
		this.setState({display: numberAdd, flag: false});
	
	}
	


	
	finishOperation = (event) => {
		let toUtil = this.state.display;
		const len = toUtil.length;
		for(let i = 0; i < len; i++){ 
			toUtil = toUtil.replace('++','+').replace('//','/').replace('**','*').replace('--','+').replace('..','.')
				.replace('+*','+').replace('+/','+').replace('+.','+')
				.replace('-+','-').replace('-*','-').replace('-/','-').replace('-.','-')
				.replace('*+','*').replace('*-','*').replace('*/','*').replace('*.','*')
				.replace('/+','/').replace('/-','/').replace('/*','/').replace('/.','/')
				.replace('.+','.').replace('.-','.').replace('.*','.').replace('./','.');		
		}

		if(toUtil == '.'){
		
			toUtil = '0';
		}

		if(['/','+','*','-'].some((el) => el == toUtil[toUtil.length - 1])){
			
			toUtil = toUtil.split('');
			toUtil.pop();
			toUtil = toUtil.join('');
			
		}
		
	

			
		this.setState({display: eval(`${toUtil}`), flag: true})
			
	}
	
	componentDidMount(){
		let buttons = document.getElementsByTagName('button');
		for(let i = 0; i < buttons.length; i++){
			buttons[i].className = buttonClass;
			if(buttons[i].value == '=' || buttons[i].value == 'C'){
				buttons[i].className = 'btn btn-block btn-danger col-md-6';
			}

			if(['+','-','/','*'].some((el) => el == buttons[i].value)){
				buttons[i].className = 'btn btn-block btn-warning col-md-3';	
			}


		}			
		//let rows = document.getElementsByClassName('row');
		

	}

	componentDidUpdate(){
		this.componentDidMount.call();	

	}





	render(){

		

			
		const functionalPad = (
			
			<div className = 'row'>
				<button onClick = {() => this.setState({display: Math.sin(this.state.display * Math.PI / 180)})}>sin</button><button onClick = {() => this.setState({display: Math.cos(this.state.display * Math.PI/180)})}>cos</button><button onClick = {() => this.setState({display: Math.tan(this.state.display * Math.PI / 180)})}>tg</button><button onClick = {() => this.setState({display: 1 / Math.tan(this.state.display * Math.PI / 180)})}>ctg</button>
				<button onClick = {() => this.setState({display: Math.sqrt(this.state.display)})}>&#8730;</button><button onClick = {() => this.setState({display: Math.cbrt(this.state.display)})}>&#8731;</button><button onClick = {() => this.setState({display: this.state.display ** 2})}>x<sup>2</sup></button><button onClick = {() => this.setState({display: this.state.display ** 3})}>x<sup>3</sup></button>
				<button onClick = {() => this.setState({display: this.state.display /  100})}>&#37;</button><button>&#137;</button><button onClick = {() => this.setState({display: Math.round(this.state.display)})}>&#177;</button><button onClick = {() => this.setState({display: this.state.display * -1})}><sup>+</sup>-</button>
			</div>
		)



		return (

			<div className = 'container-fluid'>
				<div className = 'jumbotron text-right'>{this.state.display}</div>
				<div className = 'row'>
				<button value = 'C' style = {{paddingTop: '1px'}} onClick = {() => this.setState({display: '0'})}> C </button> <button onClick = {() => this.state.functional ? this.setState({functional: false}) : this.setState({functional: true}) }>&#402; </button><button onClick = {this.addToDisplay} value = '+'> + </button>
				<button onClick = {this.addToDisplay} value = '7'> 7 </button> <button onClick = {this.addToDisplay} value = '8'> 8 </button> <button onClick = {this.addToDisplay} value = '9'> 9 </button><button onClick = {this.addToDisplay} value = '-'> - </button>
				<button onClick = {this.addToDisplay} value = '4'> 4 </button> <button onClick = {this.addToDisplay} value = '5'> 5 </button> <button onClick = {this.addToDisplay} value = '6'> 6 </button><button onClick = {this.addToDisplay} value = '*'> * </button>
				<button onClick = {this.addToDisplay} value = '1'> 1 </button> <button onClick = {this.addToDisplay} value = '2'> 2 </button> <button onClick = {this.addToDisplay} value = '3'> 3 </button><button onClick = {this.addToDisplay} value = '/'> / </button>
				<button onClick = {this.addToDisplay} value = '0'> 0 </button> <button onClick = {this.addToDisplay} value = '.'> . </button> <button value = '=' onClick = {this.finishOperation}> = </button>
					
				</div>
				{this.state.functional && functionalPad}
			</div>	

		)
	
	}


}
