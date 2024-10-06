'use client'

import React, { useState, useEffect } from 'react';
import styles from "../styles/page.module.css";
import { Inter } from 'next/font/google';

import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const inter = Inter({ subsets: ['latin'] });

const ColorSwatch = ({hexcode, color, username}) => {

  if (typeof hexcode == "undefined") hexcode = "#000";

  return (
    <div className={inter.className}>
      <div className={styles.colorSwatch}>
        <div style={{backgroundColor: hexcode}} className={styles.colorItself}/>
        <div className={styles.swatchText}>
            <p className={styles.swatchTextName}>{typeof username == "undefined" || username == "" ? "undefined" : username}</p>
            <div className={styles.swatchTextWrapper}>
            <p className={styles.swatchTextHexcode}>{hexcode.toUpperCase()}</p> {/* TODO: toUpperCase*/}
            {(username != "" && hexcode != "#208FFF") && color == "" ? <></> : <p className={styles.swatchTextColor}>"{typeof color == "undefined" || color == "" ? "undefined" : color}"</p>}
            </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {

  const [search, setSearch] = useState("");
  const [gotSwatches, setGotSwatches] = useState(false);
  const [swatches, setSwatches] = useState([
    // { hexcode: "#abC", color: "idk", username: "Spongebob", },
    // { hexcode: "#123", color: "who can say", username: "Patrick Star", },
    // { hexcode: "#18B", color: "unknown", username: "Squidward" },
    // {}
  ])

  useEffect (() => {
    const response = fetch(`/api/getSwatches`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        method: 'GET',
      }).then((data) => data.json()).then((r) => 
      {
        // console.log(r.swatches);
        setSwatches(r.swatches);
        setFilteredSwatches(r.swatches);
        setGotSwatches(true);
      });
  }, [])



  const [ filteredSwatches, setFilteredSwatches ] = useState(swatches);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);

    const filteredItems = swatches.filter((swatch) =>
      ( typeof swatch.username !== "undefined" &&
      swatch.username.toLowerCase().includes(e.target.value.toLowerCase()) ) ||
      ( typeof swatch.color !== "undefined" &&
      swatch.color.toLowerCase().includes(e.target.value.toLowerCase()) )
      // || swatch.hexcode.toLowerCase().includes(search.toLowerCase())
    )

    setFilteredSwatches(filteredItems);
  }

  // console.log("Swatches:");
  // console.log(swatches);

  return (
    <div className={styles.gallery}>
      <p className={styles.title}>Gallery</p>
      <p className={styles.galleryText}>Take a look at what others have already submitted!</p>
      <div className={styles.search}>
        <FaSearch />
        <div className={styles.searchWrapper}>
          <input type="text" value ={search} onChange={handleSearchChange} placeholder="Type to search" className={styles.textInput}/>
          <FaXmark onClick={() => handleSearchChange({target: { value: "" }})} className={styles.clear} />
        </div>
      </div>
      <div className={styles.swatches}>
        {filteredSwatches.length != 0 ?
        filteredSwatches.map((swatch) => {
          if (typeof swatch.hexcode !== "undefined" && typeof swatch.username !== "undefined" && typeof swatch.color !== "undefined") {
          return ( <ColorSwatch hexcode={swatch.hexcode} color={swatch.color} username={swatch.username} key={swatch.hexcode + swatch.username}/> );
        } else {
          console.log("prevented rendering of undefined swatch");
          return <></>
        }
        }) : gotSwatches ? <p>Looks like there's nothing that matches your search :p</p> 
                         : <p>I'm looking for the swatches! Let me know if this takes too long / doesn't work</p>} 
      </div>
    </div>
  )
}