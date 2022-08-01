import React from 'react'
import TextArea from './TextArea'
import UploadFile from './UploadFile'

const Header = () => {
  return (
    <header className='bg-black p-5 flex justify-center items-center gap-x-5 text-white'>
      <TextArea/>
      <UploadFile/>
    </header>
  )
}

export default Header