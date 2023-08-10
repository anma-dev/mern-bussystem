import React, { useEffect, useState } from 'react';
import LangList from '../Editor/LangList';
import voice from '../../assets/image.png';
import CodeMirror from '@uiw/react-codemirror';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { javascript } from '@codemirror/lang-javascript';


function Javascript() {

  const [code,setcode] = useState("");
  const [output,setOutput] = useState("");

  const runCode = ()=>{
    try {
      const result = eval(code);
      if (result !== undefined) {
        setOutput(result.toString());
      } else {
        setOutput(output);
      }
    } catch (error) {
      setOutput(error.toString());
    }
  };

  const originalConsoleLog = console.log;

  useEffect(()=>{
    console.log = function(message){
      const consoleOutput = document.getElementById('consoleOutput');
      const btn = document.querySelector('.btn1');
      btn.addEventListener('click',()=>{
        consoleOutput.innerText = "";
      })
      const paragraph = document.createElement('p');
      // const paragraph = document.querySelector(".rightplayground")
      paragraph.textContent = message;

      consoleOutput.appendChild(paragraph);
      originalConsoleLog.apply(console,arguments);
    };
  },[])

  const clear = ()=>{
    const box = document.querySelector("#consoleOutput");
    box.innerHTML = "";
  }

  return (
    <>
      <div className="jsContainer"> 
            <div className="jsBody">
                <div className="leftLang">
                    <LangList/>
                </div>
                <div className="PlaygroundMain">
                  <div className='runHeaderJS'>
                    <div className='jsleftheaderfile jsfile'>
                      <mark><h2>index.js</h2></mark>
                      <div className='runbtn'>
                      <button className='vbtn'>
                      <img className='voicebtn' src={voice} alt='voice'/>
                      </button>
                        <button className='btn btn1' onClick={runCode}>RUN</button>
                      </div>
                    </div>
                    <div className='jsrightheaderfile jsfile'>
                      <mark><p>OUTPUT</p></mark>
                      <button className='clear' onClick={clear}>Clear</button>
                    </div>
                  </div>
                  <div className='jsplayground playground'>
                    <div className='leftplayground snippet'>
                      <CodeMirror
                        value={code}
                        height='80vh'
                        theme={darcula}
                        // extensions={[javascript({jsx:true})]}
                        extensions={[javascript()]}
                        onChange={(value) =>{
                          setcode(value)
                        }}
                      />
                    </div>
                    <div className='rightplayground snippet' id='consoleOutput' >
                      {/* {setcode} */}
                      {/* {setOutput} */}
                      {/* {output} */}
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Javascript