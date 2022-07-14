class Home extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div>
        <h1>Home</h1>
        <p id="hello">Hello, {this.props.username}!</p>
        <form action="/logout" method="post">
          <input type="submit" value="Logout"/>
        </form>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home username={authData.username} />);