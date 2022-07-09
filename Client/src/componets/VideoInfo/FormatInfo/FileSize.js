import React from 'react'

const FileSize = ({ format }) => {
  return (
    format.contentLength ?
      <span className="File-Size">
        {format.contentLength <= 1073741824 ?
          (format.contentLength / 1048576).toFixed(2) + ' Mb' :
          (format.contentLength / 1073741824).toFixed(2) + ' Gb'}
      </span> :
      <></>
  )
}

export default FileSize