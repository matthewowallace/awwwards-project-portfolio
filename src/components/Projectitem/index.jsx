import React, {useRef, useReducer} from "react";
import { Hash } from "react-feather";
import "./style.scss";
import Title from "./Title";
import Image from "./image";

const initialState ={
    opacity: 0,
    parallaxPos: {x:0 ,y: -20}
}


function reducer (state, action){
    switch(action.type){
        case "CHANGE/OPACITY":{
            return{
                ...state,
                opacity: action.payload,
            }
        }
        case "MOUSE/COORDINATES":{
            return{
                ...state,
                parallaxPos: action.payload
            }
        }
        default:{
            throw new Error();
        }
    }
}

export default function Projectitem({project, itemIndex}){
    const listItem = useRef(null);
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const parallax = (event) => {
        const speed = -15;
        const x = (window.innerWidth - event.pageX * speed)/100;
        const y = (window.innerHeight - event.pageY * speed)/100;

        dispatch({type: 'MOUSE/COORDINATES', payload: {x,y} })
    }

    const  handleMouseEnter = () => {
        dispatch({type: 'CHANGE/OPACITY', payload:1 })
        listItem.current.addEventListener('mousemove', parallax)
        
    };

    const  handleMouseLeave = () => {
        listItem.current.removeEventListener('mousemove', parallax)
        dispatch({type: 'CHANGE/OPACITY', payload:0 })
        dispatch({type: 'MOUSE/COORDINATES', payload: initialState.parallaxPos })
       
    };

    return(
        <li className="project-item-container" ref={listItem}>
            <Title title={project.title} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>
            <Image url={project.url} opacity={state.opacity} parallaxPos={state.parallaxPos}/>

            <div className="info-block">
                <p className="info-block-header">
                    <span>
                        <Hash />0{itemIndex}
                    </span>
                </p> 

                {project.info.map((element)=>(
                    <p key={element}><span>{element}</span></p>
                ))}
            </div>
        </li>
    )
}