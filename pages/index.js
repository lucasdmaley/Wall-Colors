'use client'

import styles from "../styles/page.module.css";
import { Inter } from 'next/font/google';

import { CustomPicker } from 'react-color';
import { FaArrowRight } from "react-icons/fa";

var { Saturation } = require('react-color/lib/components/common');
var { Hue } = require('react-color/lib/components/common');
var { EditableInput } = require('react-color/lib/components/common');

import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Defining custom picker component
const MyPicker = ({ hex, hsl, hsv, onChange }) => {
  const [hexPickerState, setHexPickerState] = useState({ color: "#757575" });

  const hexInputStyle = {
    input: { border: "none", fontSize: '18px', color: hexPickerState.color, backgroundColor: "rgba(0,0,0,0)", width: "100px" },
  }

  return (
    <div style={{ width: '300px' }} onClick={() => setHexPickerState({color: "#000"})}>
      
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

  const [username, setUsername] = useState("");
  const [colorName, setColorName] = useState("");
  const [hexCode, setHexCode] = useState("#208FFF");
  const [submitState, setSubmitState] = useState(0); // 0 == unsubmitted; 1 == submitting; 2 == submitted
  const [remindUsername, setRemindUsername] = useState(false);

  /* Color Picker component */
  const handleChange = (newColor) => {
    setHexCode(newColor.hex);
  };

  const postSwatch = async () => {
    if (submitState == 0) {
      setSubmitState(1);
      setRemindUsername(false);
      console.log("in postSwatch!")
      const response = await fetch("/api/postSwatch", {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        method: 'POST',
        body: JSON.stringify({
          username: username,
          color: colorName,
          hexcode: hexCode,
        }),
      }).then((data) => data.json()).then((r) => {
          console.log("there we go - all done!");
          console.log(r);
          if (r.message == "Success!") setSubmitState(2);
          else setSubmitState(3);
      });
    }
  }

  return (
    <div className={styles.page}>
      <div className={inter.className}>
        <main className={styles.main}>
          <div className={styles.leftSide}>
            <p className={styles.title}>Hey!</p>
            <p className={styles.bodyText}>I’m trying to add some color to my room, so please choose your favorite + submit your name and I’ll add it to the wall :)</p>
            <CustomColorPicker color={hexCode} onChange={handleChange} />
            <div className={styles.row}>
              <p className={styles.inputName}>Color Name</p>
              <input className={styles.inputUsername} type="text" value={colorName} onChange={(e) => {setColorName(e.target.value)}} placeholder="Chill Blue"/>
            </div>
            <div className={styles.row}>
              <p className={styles.inputName}>Your Name</p>
              <input className={styles.inputUsername}type="text" value={username} onChange={(e) => {setUsername(e.target.value)}} placeholder="Lucas Maley"/>
            </div>
            <div className = {styles.rightSide}>
              <div className={styles.colorSwatch}>
                <div style={{backgroundColor: hexCode}} className={styles.colorItself}/>
                <div className={styles.swatchText}>
                    <p className={styles.swatchTextName}>{username == "" ? "Lucas Maley" : username}</p>
                    <div className={styles.swatchTextWrapper}>
                    <p className={styles.swatchTextHexcode}>{hexCode.toUpperCase()}</p>
                    {(username != "" && hexCode != "#208FFF") && colorName == "" ? <></> : <p className={styles.swatchTextColor}>"{colorName == "" ? "Chill Blue" : colorName}"</p>}
                    </div>
                </div>
              </div>
              <p className={styles.caption}>This is what it'll look like</p>
              {remindUsername ? <p className={styles.warning}>Make sure to add your name before submitting!</p> : <></>}
            </div>
            { submitState == 0 ?
              <div className={styles.submitButton} onClick={() => {username != "" ? postSwatch() : setRemindUsername(true) }  }>
                <p className={styles.submitText}>Submit</p>
                <FaArrowRight className={styles.submitText} value={{ color: "white"}}/>
              </div>
              : submitState == 1 ?
              <div className={styles.submitButtonSubmitting}>
                <p className={styles.submitText}>Submitting...</p>
              </div>
              : submitState == 2 ?
              <div className={styles.submitButtonSuccess}>
                <p className={styles.submitText}>Submitted! Thank you :)</p>
              </div>
              :
              <div className={styles.submitButtonError}>
                <p className={styles.submitText}>Error :/</p>
                <p className={styles.errorText}>Let me know and I'll try and fix it!</p>
              </div>
            }
          </div>
        </main>
      </div>
    </div>
  );
}