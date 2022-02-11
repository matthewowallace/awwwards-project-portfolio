import React, { useEffect, useRef, useState } from 'react'
import { pageData } from '../../data'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Projectitem from '../components/Projectitem'


export default function Home() {
  const menuItems = useRef(null);
  const [renderItems,  setRenderItems] = useState(pageData);
 
  const cloneItems = () => {
     
     const itemHeight  = menuItems.current.childNodes[0].offsetHeight;
     const fixMax = Math.ceil(window.innerHeight / itemHeight);

     const clonedItems = [...renderItems]
     .filter((_, index) =>index<fixMax)
     .map((target)=> target);
     
     setRenderItems([...renderItems, ...clonedItems]);
     return clonedItems.length * itemHeight;
  };

  const getScrollPos  = () => {
      return (
        (menuItems.current.pageYOffset || menuItems.current.scrollTop) - 
        (menuItems.current.clientTop || 0)
      );
  };


  const setScrollPos = (pos) =>{
     menuItems.current.scrollTop = pos;
  };

  const initScroll = () =>  {

    const scrollPos = getScrollPos();
    if(scrollPos <= 0 ){
      setScrollPos(1);
    }
  };

  useEffect(()=> {
    
      const clonesHeight = cloneItems();
      initScroll();
      menuItems.current.style.scrollBehavior = "unset";    
      
      const scrollUpdate = () =>  {

          const scrollPos = getScrollPos();
          if(clonesHeight + scrollPos >= menuItems.current.scrollHeight){
            setScrollPos(1);
          }else if(scrollPos <= 0){
              setScrollPos(menuItems.current.scrollHeight - clonesHeight);
          }

      }
    menuItems.current.addEventListener('scroll', scrollUpdate );

    return () =>{
      menuItems.current.removeEventListener('scroll', scrollUpdate);
    }

  }, 
  []);

  

  return (
    <div>
        <Header/>
        <div className='main-container' id='main-container'>
          <ul ref={menuItems}>
            {renderItems.map((project, index) => (
               <Projectitem key={index} project={project} itemIndex={index} />
             ))}
           </ul>
        </div>
        <Footer/>
    </div>
  )
}
