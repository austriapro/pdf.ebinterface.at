import React, {Component} from 'react';

class Loading extends Component{
  constructor(props){
    super(props)
  }

render(){

  let loading;
  console.log(this.props);
  //console.log(this.props.loadingComp);
 // console.log(this.props.errorComp);
  //Preloader wird aktiviert oder Error wird eingeblendet
  if (this.props.loadingComp === true) {
    loading = <div className="loading-circle-1"></div>
  }

  else
    loading = <div className="pdf-error">{this.props.errorComp}</div>


  return(
    <div className="pdf-loading col-md-4">
      {loading}
    </div>
  )
}
}
export default Loading;
