import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function Profile({id}) {
    const [profileData, setProfileData] = useState(null);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        async function  fetchData(){
            try{
                const response = await axios.get(`http://localhost:8080/profile/${id}`);
                setProfileData(response.data);
            }catch (e){
                console.error('fetch profile error', e);
            }
        }

    },[id]);

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:8080/profile/${id}`);
            setLikes(likes + 1);
        } catch (e){
            console.error('++ like error', e);
        }
    }


    return profileData ? (
        <div className="bg-secondary text-light rounded p-3 mt-3">
            <div className="row">
                <div className="col-md-3">
                    <img className="img-fluid rounded-circle" alt="coat of arms"
                         src="https://cdn.britannica.com/q:60/21/75121-050-8CF5E1DB/Bats-structures-organs-sound-frequencies-signals-contexts.jpg"/>
                    <div className="text-center fst-italic">"{profileData.profile.motto}"</div>
                </div>
                <div className="col-md-9 pt-3">
                    <h2>{profileData.profile.name}</h2>
                    <div className="row col-md-auto mx-2">
                        <div className="col-md-auto m-1 border border-dark" onClick={handleLike}>
                            <img alt="like" src="thumbsup-active.png"/> 15
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <h3>Sayings</h3>
                <ul>
                    {profileData.quotes.map((quote, index) => (
                        <li key={index}>{quote.text()}</li>
                    ))}
                </ul>
            </div>

        </div>
    ): null;
}

function App() {

  return (
    <div className="container">

      <Profile id="14"/>
  
      <div className="border mt-3 p-2">
      <h3>Instructions</h3>

      <p>
        Above is a <code>Profile</code> component that displays a certain profile from the database. The profile
        id is specified as a prop (14 in this case). Don't change that as it's our only example.
      </p>

      <p>
        That component currently shows static, mocked-up data. Your job is to make it functional.
      </p>

      <ol>
        <li>Create a server route to return all data in the database for a single profile by id
          <ul>
            <li>The data should include the quotes in the database that go with that profile</li>
          </ul>
        </li>
        <li>Update the <code>Profile</code> component to fetch the profile data on startup
          <ul>
            <li>Use whatever profile id is passed in to the component as a prop (14 in our example, but should work for any)</li>
            <li>You don't have to show "Loading" and "Error" to the user</li>
          </ul>
        </li>
        <li>Update the <code>Profile</code> component to display the retrieved data in place of the mockup data</li>
        <li>Update the <code>Profile</code> component so you can click on "like" to increase the count locally
          <ul>
            <li>Since you're only updating locally, it resets to 0 on page reload</li>
          </ul>
        </li>
        <li>Create a server route that increments the number of "likes" in the database for a certain profile id
            <ul>
              <li>You can use a GET or POST route</li>
              <li>It always just increments it by 1</li>
            </ul>
        </li>
        <li>Update the <code>Profile</code> component to call that route to update the "likes" in the database
          <ul>
            <li>Now the changes should persist through page reloads</li>
          </ul>
        </li>
      </ol>

    </div>
  </div>
  );
};

export default App;
