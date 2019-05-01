import React from "react";

export default class SubItem extends React.Component{
    constructor(props){
        super(props);
    }
 /*   shouldComponentUpdate(){
        return false;
    }*/
    render(){
        console.log(this.props.data.label);
        return <li>{this.props.data.label}</li>
    }
}