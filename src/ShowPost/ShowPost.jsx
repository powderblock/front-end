import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { postActions } from '../_actions';

class ShowPost extends React.Component {
    componentDidMount() {
        this.props.getPosts();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deletePost(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All posts:</h3>
                {users.loading && <em>Loading posts...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.title + ' ' + user.author}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getPosts: postActions.getAll,
    deletePost: postActions.delete
}

const connectedShowPost = connect(mapState, actionCreators)(ShowPost);
export { connectedShowPost as ShowPost };
