import GoogleMap from './components/GoogleMap'
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios';

function App() {
  const [users, setUsers]=useState([])
  const [text, setText]=useState('')
  const [suggestions, setSuggestions]=useState([])

  useEffect(()=>{
    const loadUsers=async()=>{
      const response=await axios.get('https://reqres.in/api/users');
      console.log(response.data)
      setUsers(response.data.data)
    }
    loadUsers()
  },[])

  const onSuggestHandler=(text)=> {
    setText(text);
    setSuggestions([]);
  }

  const onChangeHandler=(text)=>{
    let matches=[]
    if(text.length>0) {
      matches=users.filter(user=>{
        const regex=new RegExp(`${text}`,'gi');
        return user.email.match(regex)
      })
    }
    console.log(matches,'matches')
    setSuggestions(matches)
    setText(text)
  }
  return (
    <div className="container">
      <h1>Google Maps Integration</h1>
      <GoogleMap />
      <input type='text' value={text} className='col-md-12 input' style={{marginTop: 10}} onChange={(e)=>onChangeHandler(e.target.value)} 
      // onBlur={()=>{setTimeout(()=>{setSuggestions([])},100)
  //   }
  // }
    />
      {suggestions && suggestions.map((suggestion, i)=>
      <div key={i} className='suggestion col-md-12 justify-content-md-center' onClick={()=>onSuggestHandler(suggestion.email)}>{suggestion.email}</div>)}
    </div>
  );
}

export default App;
