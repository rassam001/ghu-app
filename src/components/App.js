import React, { Component } from "react";
import "../css/App.css";

class App extends Component {
  state = {
    users: []
  };
  searchRef = React.createRef();
  submitForm = e => {
    e.preventDefault();
    const value = this.searchRef.current.value;
    fetch(`https://api.github.com/search/users?q=${value}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.items);
        this.setState({ users: data.items });
      });
  };
  render() {
    return (
      <React.Fragment>
        <header>
          <h1>GitHub Users</h1>
          <form className="search-form" onSubmit={this.submitForm}>
            <input
              ref={this.searchRef}
              name="users"
              type="text"
              placeholder="Search for Users..."
            />
            <button>Search</button>
          </form>
        </header>
        <ul>
          {this.state.users.map(user => {
            return (
              <li key={user.login}>
                <a href={user.html_url}>
                  <figure>
                    <img src={user.avatar_url} alt={user.login} />
                    <figcaption>{user.login}</figcaption>
                  </figure>
                </a>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default App;
