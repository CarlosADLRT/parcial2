import React from 'react';

import {
  Redirect,
  withRouter
}
from 'react-router-dom';

import { login } from './../../helpers.jsx';
import * as firebase from 'firebase'


class Dashboard extends React.Component {


  constructor() {
    super();
    this.state = {
      posts: []
    }

  }

  componentDidMount() {
    firebase.database().ref().child('posts').on('value', (snapshot) => {

      let messages = snapshot.val();
      let newState = [];
      for (let message in messages) {
        newState.push({
          id: message,
          title: messages[message].title,
          description: messages[message].description,
        });
      }
      console.log(newState)
      this.setState({
        posts: newState
      });
    });
  }

  render() {


    return (<article>
        
		   <h2>Posts</h2>
        <div className="row clickable">
		   {this.state.posts.map(post =>{
		     return (
		     <div className="col-7" onClick={()=>{this.props.history.push(`/post/${post.id}`)}}>
		            <div key={post.title+'1'} className="card-bootcamp">
          <div className="card-body d-flex flex-column align-items-center align-content-around justify-content-around">
              <span className="title-bootcamp">{post.title}</span>
              <span >{post.description}</span>

          </div>
        </div>
		     </div>
		     )
		   })}
		   </div>
		</article>);
  }
}


export default Dashboard;
