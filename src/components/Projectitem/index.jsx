import React from "react";
import { Hash } from "react-feather";
import "./style.scss";
import Title from "./Title";
import Image from "./image";

export default function Projectitem({project, itemIndex}){
    return(
        <li className="project-item-container">
            <Title title={project.title}/>
            <Image url={project.url}/>

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