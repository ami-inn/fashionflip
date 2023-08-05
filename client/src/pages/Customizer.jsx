import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  ColorPicker,
  AiPicker,
  FilePicker,
  CustomButton,
  Tab,
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);

  // show tab content depend on active tab

  const [file,setFile]=useState('')
  const [prompt,setPrompt]=useState('')
  const [generatingImg,setGeneratingImg]=useState(false)
  const [activeEditorTab,setActiveEditorTab]=useState('')
  const [activeFilterTab,setActiveFilterTab]=useState({
    logoShirt:true,
    stylishShirt:false
  })


  const generateTabContent = ()=>{
    switch (activeEditorTab) {

      case 'colorpicker':
      return <ColorPicker/>

      case 'filepicker':
      return <FilePicker
      file={file}
      setFile={setFile}
      readFile={readFile}

      />

      case 'aipicker':
      return <AiPicker
      prompt={prompt}
      setPrompt={setPrompt}
      generatingImg={generatingImg}
      handleSubmit={handleSubmit}
      />

      default:
        return null
    }
  }

  const handleSubmit= async (type)=>{
    if(!prompt) return alert('please enter a prompt')

    try{
      //call backend to generate image
    }
    catch(error){
      alert(error)
    }
    finally{
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }


  const handleDecal = (type,result) =>{
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if(!activeFilterTab[decalType.FilterTab]){
      handleActiveFilterTab(decalType.FilterTab)
    }

  }

  const handleActiveFilterTab= (tabName)=>{
    switch (tabName) {
      case 'logoShirt':
      state.isLogoTexture= !activeFilterTab[tabName]  
      break;

      case 'stylishShirt':
      state.isFullTExture= !activeFilterTab[tabName]  
      break;
      
        default:
        state.isLogoTexture=true
        state.isFullTExture=false
    }

    //after setting the state active filter tab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]:!prevState[tabName],
      }
    })
  }

  const readFile = (type)=>{
    reader(file).then((result)=>{
      handleDecal(type,result)
      setActiveEditorTab('')
    })
  }


  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* for the side toggle bar */}
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => {setActiveEditorTab(tab.name)}} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* for the back button */}

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="go back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
               key={tab.name}
               tab={tab}
                isFilterTab
                 isActiveTab={activeFilterTab[tab.name]} 
                  handleClick={() => handleActiveFilterTab(tab.name)} 
                  />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
