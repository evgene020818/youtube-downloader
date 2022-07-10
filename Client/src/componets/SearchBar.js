import React from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({handleSubmit, setVideoUrl}) => {
  return (
    <form
        className='Search-Form'
        onSubmit={handleSubmit}
      >
        <div className='Search-Cell Search-Input'>
          <input
            type="text"
            onChange={(e) => setVideoUrl(e.target.value)}
            autoComplete='off'
            placeholder='Enter a link to a video or video ID...'
            required
          />
        </div>
        <div className="Search-Cell Search-Button">
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='Search-Icon' />
          </button>
        </div>
      </form>
  )
}

export default SearchBar