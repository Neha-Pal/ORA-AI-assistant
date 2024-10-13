import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { IoMenuSharp } from "react-icons/io5";  
import { FaPlus } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { GrHistory } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { Context } from '../../context/context';



const Sidebar = () => {

    const [ extended, setExtended] = useState(false)
    const {onSent, prevPrompt, setRecentPrompt, newChat} = useContext(Context)

    const loadPrompt = async(prompt) =>{
      setRecentPrompt(prompt)
      await onSent(prompt)
    }

    const handleMenuClick = () => {
        setExtended(!extended);  // Toggle between true and false
      };
  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        <IoMenuSharp className="menu-icon" onClick={handleMenuClick} /> 
        <div onClick={()=>newChat()} className='newchat'>
            <FaPlus/>
            {extended?<p>New Chat</p>:null}
        </div>
        {extended?(
        <div className="recent">
            <p className="recent">Recent</p>
            {prevPrompt.map((item, index)=>{
              return(
                <div onClick={()=>loadPrompt(item)} key = {index} className="recent-entry">
                  <FaMessage />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}
            
        </div>) :null}
      </div>
      <div className="bottom">
        <div className="bottom-item">
            <BsFillQuestionCircleFill />
            {extended?<p>Help</p>:null}
        </div>
        <div className="bottom-item">
            <GrHistory />
            {extended?<p>Activity</p>:null}
        </div>
        <div className="bottom-item">
            <IoSettingsSharp />
            {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
