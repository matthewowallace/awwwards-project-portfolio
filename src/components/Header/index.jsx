import React, {useContext} from 'react'
import "./index.scss";
import { CursorContext } from "../CustomCursor/CursorManager"

export default function Header() {

  const { setSize } = useContext(CursorContext);

  const handleMouseEnter = () =>{
    setSize("medium");
  };
  
  const handleMouseLeave = () =>{
    setSize("small");
  };

  

  return (
    <div className='overlay-nav'> 
        <div className='header-container'>
            <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>WALLACE.IO</h1>
            <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>works</h1>
            <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>contact</h1>
        </div>
    </div>
  )
}
