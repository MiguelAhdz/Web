import logo from './logo.svg';
import {useEffect, useState} from 'react';
import './App.css';

function App() {
  console.log("App being redrawn");

  const [friends, setFriends] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  console.log(friends);

  useEffect(() => {
    (async () => {
      console.log("...in the effect , fetching data");
      setLoading(true);
      setError(false);
      const response = await fetch("http://localhost:8081/myfriends");
      if (!response.ok) {
        setError(true);
        setLoading(false);
      } else {
        const data = await response.json();
        setFriends(data);
        setError(false);
        setLoading(false)
      }
      console.log("...fetch has been sent")
    })();
  }, []);

  const handleDitch = (name) =>{

  };

  return (
      <div className="container">

        <h1 className="my-4">Friends</h1>
        {loading ?
        <h4>Loading...</h4>
        : error ?
        <h4>Error!</h4>
        :
        <div className="row">
          {friends && friends.map((f,i) =>
            <Card key={i} friend={f} handleDitch ={handleDitch}/>
          )}
        </div>}
      </div>
  );
}

function CardContainer({friendsProp}) {
  console.log("CardContainer being redrawn");
  const [friends, setFriends] = useState(friendsProp);

  const handleDitch = (name) => {
    setFriends(F => F.map(f =>
      f.name === name ?
      {...f, ditched: !f.ditched}
      : f));
  };

  return (
    <div className="row">
      {friends.map((f,i) =>
        <Card key={i} friend={f} handleDitch={handleDitch} />
      )}
    </div>
  );
}

function Card({friend, handleDitch}) {
  console.log("Card being redrawn");

  return (
    <div className="card m-2 w-25">
      <div className="card-body">
        <h5 className={`card-title ${friend.ditched && 'red-name'}`}>{friend.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{friend.description}</h6>
        <p className="card-text">{friend.comment}</p>
        {friend.ditched ?
        <button className="btn btn-success" onClick={() => handleDitch(friend.name)} >Redeem</button>
        :
        <button className="btn btn-danger" onClick={() => handleDitch(friend.name)} >Ditch</button>
        }
      </div>
    </div>
  );
}

export default App;
