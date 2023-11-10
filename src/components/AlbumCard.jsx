import React, { useState, useEffect } from 'react';
 import {Heart } from "react-bootstrap-icons";
const AlbumCard = ({ songInfo }) => {
  return (
    <div className="col text-center text-white" id={songInfo.id}>
      
      <img className="img-fluid " src={songInfo.album.cover_medium} alt="track"  />
       
      <p>
        Track: {songInfo.title.length < 16
          ? `${songInfo.title}`
          : `${songInfo.title.substring(0, 16)}...`}
          
        <Heart className='ms-2' />
    
         
        <br />
        Artist: {songInfo.artist.name}
      </p>
    </div>
     
  );
};

const MusicSection = ({ artistName, querySelector }) => {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
            artistName,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
              'X-RapidAPI-Key':
                '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
            },
          }
        );

        if (response.ok) {
          const { data } = await response.json();
          setMusicData(data.slice(0, 4));
        } else {
          throw new Error('Error in fetching songs');
        }
      } catch (err) {
        console.log('error', err);
      }
    };

    fetchData();
  }, [artistName]);

  return (
    <div>
      {musicData.map((songInfo) => (
        <AlbumCard key={songInfo.id} songInfo={songInfo} />
      ))}
       
    </div>
  );
};

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const div = document.querySelector('#searchResults .row');
    div.innerHTML = '';
    const searchQuery = document.querySelector('#searchField').value;

    if (searchQuery.length > 2) {
      document.querySelector('#searchResults').style.display = 'block';

      try {
        const response = await fetch(
          'https://striveschool-api.herokuapp.com/api/deezer/search?q=' +
            searchQuery,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
              'X-RapidAPI-Key':
                '9d408f0366mshab3b0fd8e5ecdf7p1b09f2jsne682a1797fa0',
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          const { data } = result;
          setSearchResults(data);
        } else {
          throw new Error('error in search');
        }
      } catch (err) {
        console.log('error', err);
      }
    } else {
      document.querySelector('#searchResults').style.display = 'none';
    }
  };

  return (
    <div>
      
      <div className="row">
        {searchResults.map((songInfo) => (
          <AlbumCard key={songInfo.id} songInfo={songInfo} />
          
        ))}
    
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <MusicSection artistName="queen" querySelector="#rockSection" />
      <MusicSection artistName="katyperry" querySelector="#popSection" />
      <MusicSection artistName="eminem" querySelector="#hipHopSection" />
      <Search />
    </div>
  );
};

export default App;

