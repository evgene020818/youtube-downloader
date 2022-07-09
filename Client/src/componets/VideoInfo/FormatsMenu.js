import React, { useState, useRef, useEffect } from 'react';
import './FormatsMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import FormatName from './FormatInfo/FormatName';
import FileSize from './FormatInfo/FileSize';
import FormatIcons from './FormatInfo/FormatIcons';
import FormatOption from './FormatOption';


const FormatsMenu = ({ formats, openNewWindow }) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const downloadButtonRef = useRef(null);
  const selectRef = useRef(null);
  useOutsideClickHandler(selectRef);

  // Hook for closing dropdown when user clicks outside
  function useOutsideClickHandler(ref) {
    useEffect(() => {
      function handleOutsideClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsSelectFocused(false);
        }
      }
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [ref]);
  }

  const initSelectOption = () => {
    setSelectedOption(formats[0]);
    return formats[0].qualityLabel || formats[0].mimeType;
  }

  const handleOptionSelect = (format) => {
    setSelectedOption(format);
    setIsSelectFocused(false);
    downloadButtonRef.current.focus();
  }

  return (
    <div className='Formats-Menu'>
      <div className="Select">
        {selectedOption ?
          <div
            className='Header'
            onClick={() => { setIsSelectFocused(!isSelectFocused) }}
          >
            <FormatName format={selectedOption}/>
            <FileSize format={selectedOption}/>
            <FormatIcons format={selectedOption} isHeader={true}/>
          </div> :
          initSelectOption()
        }
        {isSelectFocused ?
          <div
            ref={selectRef}
            className='Select-Options'
          >
            {formats.map((format, id) => {
              return <FormatOption
                  key={id}
                  format={format}
                  handleOptionSelect={handleOptionSelect}
                />
            })}
          </div> :
          <></>
        }
      </div>
      <button
        ref={downloadButtonRef}
        className="Download-Button"
        onClick={() => openNewWindow(selectedOption.url)}
      >
        <FontAwesomeIcon icon={faDownload} />
      </button>
    </div>
  )
}

export default FormatsMenu;