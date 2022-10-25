import './App.css';
import { useState } from "react";

function UserForm() {
  const [query, setQuery] = useState("")
  return (
    <div>
      <form>
        <h3>Enter a twitter username</h3>
        <input
        type = "text"
        name = "username"
        placeholder = "username"
        value = {query}
        />
        <button> Markovify! </button>
      </form>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <img className="logo" src={ require('./images/AAMarkov.jpg') } alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <UserForm />
      </header>
    </div>
  );
}



export default App;
