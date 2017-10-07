import React from 'react';
import * as  firebase from 'firebase'

class NewPost extends React.Component {

    constructor() {
        super();
        this.state = {
            isAuthenticated: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (!firebase.auth().currentUser) {
            this.props.history.push('/')
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        var user = firebase.auth().currentUser;
        if(this.state.description && this.state.title){
            const date=  new Date();
            console.log(date);
            const imageRef = firebase.database().ref().child('posts');
            imageRef.push({title: this.state.title,
                description: this.state.description,
                user : user.uid,
                date:date.toISOString()
            });
            this.props.history.push('/')
        }
        console.log(this.state,user)
    }


    render() {
        return (<section>
            <h2>Protected Page</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input type="text" className="form-control" name="title" placeholder="Title"
                           onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <textarea type="text" className="form-control" name="description" placeholder="Description"
                              onChange={this.handleChange}>
                </textarea>
                </div>
                <button type="submit" className="btn btn-primary">Publish your post</button>
            </form>


        </section>);
    }
}

export default NewPost;

