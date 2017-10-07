
import React from 'react';
import * as firebase from 'firebase'


class PostDetail extends React.Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        var ref = firebase.database().ref("posts");
        ref.orderByKey().equalTo(this.props.match.params.id).on("child_added", function(snapshot) {
  console.log(snapshot.val());
});
    }
	render() {
		return (<section>
		<h2>Public page</h2>
		<div></div>
		</section>);
	}
}

export default PostDetail;

