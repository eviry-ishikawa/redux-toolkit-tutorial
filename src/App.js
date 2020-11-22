import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { AddPostForm } from './features/posts/AddPostForm'
import { PostList } from './features/posts/PostList'
import { SinglePostPage } from './features/posts/SinglePostPage'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <PostList/>
                <AddPostForm/>
              </React.Fragment>)}
          />
          <Route exact path="/posts/:id" component={SinglePostPage} />
          <Redirect to="/" />
        </Switch>

      </div>
    </Router>
  )
}

export default App
