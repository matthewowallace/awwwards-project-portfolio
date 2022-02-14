import React, {useRef, useReducer, useContext} from "react";
import { Hash } from "react-feather";
import "./style.scss";
import Title from "./Title";
import Image from "./image";
import animate from "./animate";
import cn from "classnames";
import { CursorContext } from "../CustomCursor/CursorManager";

const initialState ={
    opacity: 0,
    parallaxPos: {x:0 ,y: -20},
    scale: 0.8,
    rotationPosition: 0,
    active: false,
}


function reducer (state, action){
    switch(action.type){
        case "MOUSE/ENTER":{
            return{
                ...state,
                active:true,
            }
        }
        case "MOUSE/LEAVE":{
            return{
                ...state,
                active:false,
            }
        }
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
        case "CHANGE/ROTATION":{
            return{
                ...state,
                rotationPosition: action.payload
            }
        }
        case "CHANGE/SCALE":{
            return{
                ...state,
                scale: action.payload
            }
        }

        default:{
            throw new Error();
        }
    }
}

export default function Projectitem({project, itemIndex}){
    const listItem = useRef(null);
    const {setSize} = useContext(CursorContext)
    const [state, dispatch] = useReducer(reducer, initialState);
    const easeMethod = 'easeInOutCubic';
    const parallax = (event) => {
        const speed = -15;
        const x = (window.innerWidth - event.pageX * speed)/100;
        const y = (window.innerHeight - event.pageY * speed)/100;

        dispatch({type: 'MOUSE/COORDINATES', payload: {x,y} })
    }

    const  handleMouseEnter = () => {
        handleScale(0.8, 1.5, 500);
        handleOpacity(0,1,500);
        handleRotation(state.rotationPosition, 500);
        listItem.current.addEventListener('mousemove', parallax);
        dispatch({type: 'MOUSE/ENTER'})
        setSize("regular");
    };

    const handleOpacity = (initalOpacity, newOpacity, duration) => {
        animate({
            
            fromValue: initalOpacity,
            toValue:newOpacity,
            onUpdate: (newOpacity, callback) => {
                dispatch({type: 'CHANGE/OPACITY', payload: newOpacity});
                callback();
            },
            onComplete: () => {},
            duration: duration,
            easeMethod: easeMethod,
        });
    };

    const handleRotation = (currentRotation, duration) => {
        
        const newRotation = Math.random() * 15 * (Math.round(Math.random()) ? 1 : -1);
        
        animate({
            
            fromValue: currentRotation,
            toValue:newRotation,
            onUpdate: (newOpacity, callback) => {
                dispatch({type: "CHANGE/ROTATION", payload: newOpacity});
                callback();
            },
            onComplete: () => {},
            duration: duration,
            easeMethod: easeMethod,
        });
    };

    const handleScale = (initialScale, newScale, duration) => {
        animate({
            
            fromValue: initialScale,
            toValue:newScale,
            onUpdate: (newOpacity, callback) => {
                dispatch({type: "CHANGE/SCALE", payload: newOpacity});
                callback();
            },
            onComplete: () => {},
            duration: duration,
            easeMethod: easeMethod,
        });
    };

    const  handleMouseLeave = () => {
        listItem.current.removeEventListener('mousemove', parallax)
        dispatch({type: 'MOUSE/COORDINATES', payload: initialState.parallaxPos });
        handleOpacity(1,0,800);
        handleScale(1,initialState.scale, 500);
        handleRotation(state.rotationPosition, 500);
        dispatch({type: 'MOUSE/LEAVE'})
        setSize("small");
    };

    return(
        <li className="project-item-container" ref={listItem}>
            <Title title={project.title} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave}/>
            <Image url={project.url} opacity={state.opacity} parallaxPos={state.parallaxPos} scale={state.scale} rotationPosition={state.rotationPosition}/>

            <div className={cn("info-block", {'as-active': state.active})}>
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