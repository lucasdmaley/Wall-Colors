'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Inter } from 'next/font/google';
import { ChromePicker } from 'react-color';

import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });


export default function Home() {
  const [state, setState] = useState({
    displayColorPicker: true,
    color: "#ab10ed"
  });

  /* Color Picker component */
  const ColorPicker = () => {
    const handleChange = (color) => {
      setState({...state, color: color.hex });
    };

    return (
      <div>
        { state.displayColorPicker ?
          <div className={ styles.popover }>
            <ChromePicker color={state.color} onChange={ handleChange } />
          </div> : null
        }
      </div>
    )
  }


  return (
    <div className={styles.page}>
      <div className={inter.className}>
        <main className={styles.main}>
          <div className={styles.leftSide}>
            <p className={styles.title}>Hey!</p>
            <p className={styles.bodyText}>I’m trying to add some color to my room, so please choose yours + submit your name and I’ll add it to the wall :)</p>
            <ColorPicker />
          </div>
          <div className = {styles.rightSide}>
            <div className={styles.colorSwatch}>
              <div style={{backgroundColor: state.color}} className={styles.colorItself}/>
              <div className={styles.swatchText}>
                <p className={styles.swatchTextName}>Lucas Maley</p>
                <div className={styles.swatchTextWrapper}>
                  <p className={styles.swatchTextColor}>{state.color}</p>
                  <p>09/24/2001</p>
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

<Image
  className={styles.logo}
  src="https://nextjs.org/icons/next.svg"
  alt="Next.js logo"
  width={180}
  height={38}
  priority
/>
<ol>
  <li>
    Get started by editing <code>app/page.js</code>.
  </li>
  <li>Save and see your changes instantly.</li>
</ol>

<div className={styles.ctas}>
  <a
    className={styles.primary}
    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      className={styles.logo}
      src="https://nextjs.org/icons/vercel.svg"
      alt="Vercel logomark"
      width={20}
      height={20}
    />
    Deploy now
  </a>
  <a
    href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    target="_blank"
    rel="noopener noreferrer"
    className={styles.secondary}
  >
    Read our docs
  </a>
</div>


 <a
  href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  target="_blank"
  rel="noopener noreferrer"
>
  <Image
    aria-hidden
    src="https://nextjs.org/icons/file.svg"
    alt="File icon"
    width={16}
    height={16}
  />
  Learn
</a>
<a
  href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  target="_blank"
  rel="noopener noreferrer"
>
  <Image
    aria-hidden
    src="https://nextjs.org/icons/window.svg"
    alt="Window icon"
    width={16}
    height={16}
  />
  Examples
</a>
<a
  href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
  target="_blank"
  rel="noopener noreferrer"
>
  <Image
    aria-hidden
    src="https://nextjs.org/icons/globe.svg"
    alt="Globe icon"
    width={16}
    height={16}
  />
  Go to nextjs.org →
</a>
*/