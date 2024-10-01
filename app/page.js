'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Inter } from 'next/font/google';
import { ChromePicker } from 'react-color';

import { CustomPicker } from 'react-color';

var { Saturation } = require('react-color/lib/components/common');
var { Hue } = require('react-color/lib/components/common');
var { EditableInput } = require('react-color/lib/components/common');


import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Define your custom picker component
const MyPicker = ({ hex, hsl, hsv, onChange }) => {
  const [hexPickerState, setHexPickerState] = useState({ color: "#757575" });

  const hexInputStyle = {
    input: { border: "none", fontSize: '24px', color: hexPickerState.color, backgroundColor: "rgba(0,0,0,0)", width: "120px" },
  }

  return (
    <div style={{ width: '420px' }} onClick={() => setHexPickerState({color: "#000"})}>
      
      {/* Saturation Area */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', marginBottom: '10px' }}>
        <Saturation hsl={hsl} hsv={hsv} onChange={onChange} />
      </div>

      {/* Hue Area */}
      <div style={{ position: 'relative', height: '10px', marginBottom: '10px' }}>
        <Hue hsl={hsl} onChange={onChange} />
      </div>

      {/* Editable Hex Input */}
      <div className={styles.row}>
        <p className={styles.inputName}>Hex Code</p>
        <div className={styles.hexPickerWrapper} onClick={() => setHexPickerState({color: "#000"})}>
          <EditableInput value={hex} onChange={onChange} style={hexInputStyle} className={styles.hexPicker}/>
        </div>
      </div>
    </div>
  );
};

const CustomColorPicker = CustomPicker(MyPicker);


export default function Home() {
  const [colorState, setColorState] = useState({
    displayColorPicker: true,
    color: "#208FFF"
  });

  const [username, setUsername] = useState("");
  const [colorName, setColorName] = useState("");

  /* Color Picker component */
  const handleChange = (newColor) => {
    setColorState({ ...colorState, color: newColor.hex});
  };



  return (
    <div className={styles.page}>
      <div className={inter.className}>
        <main className={styles.main}>
          <div className={styles.leftSide}>
            <p className={styles.title}>Hey!</p>
            <p className={styles.bodyText}>I’m trying to add some color to my room, so please choose your favorite + submit your name and I’ll add it to the wall :)</p>
            <CustomColorPicker 
              color={colorState.color} 
              onChange={handleChange} 
            />
            <div className={styles.row}>
            <p className={styles.inputName}>Color Name</p>
              <input type="text" value={colorName} onChange={(e) => {setColorName(e.target.value)}}
                className={styles.inputUsername} placeholder="Chill Blue"/>
            </div>
            <div className={styles.row}>
            <p className={styles.inputName}>Your Name</p>
              <input type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}
                className={styles.inputUsername} placeholder="Lucas Maley"/>
            </div>
          </div>
          <div className = {styles.rightSide}>
            <div className={styles.colorSwatch}>
              <div style={{backgroundColor: colorState.color}} className={styles.colorItself}/>
              <div className={styles.swatchText}>
                <p className={styles.swatchTextName}>{username == "" ? "Lucas Maley" : username}</p>
                <div className={styles.swatchTextWrapper}>
                  <p className={styles.swatchTextColor}>{colorState.color.toUpperCase()}</p>
                  <p>"{colorName == "" ? "Chill Blue" : colorName}"</p>
                </div>
              </div>
            </div>
            <p className={styles.caption}>This is what it'll look like</p>
          </div>
        </main>
      </div>
    </div>
  );
}


/*

<p 
                className={styles.displayText} 
                onClick={() => document.getElementById('username').focus()} // Click to focus input
              >
                {username || "Lucas Maley"}
                </p>
*/