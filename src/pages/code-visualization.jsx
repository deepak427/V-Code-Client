import React from "react";
import { useState, useEffect } from "react";
import "./code-visualization.css";
import axios from "axios";
import "./Slider.css";
import Footer from "../components/Footer";
import Editor from "@monaco-editor/react";
import { useLocation } from "react-router-dom";
import GridLoader from "react-spinners/PropagateLoader";

const baseURL = "https://v-code-server.onrender.com";
var anim = [];
var i = 0;
const PRIMARY_COLOR = "turquoise";
const SECONDARY_COLOR = "red";
var inputSlider_2;
var pause;
var play;
var animations = [];
var p_string = [
  "",
  "Digit rearrangement method to find next greater number with same set of digits",
  "Write an algorithm to find out next greater number to given number with the same set of digits Asked in : Morgan Stanley, Makemytrip, Amazon. Ex. Input 1: A = [1, 2, 3] Output 1:[1, 3, 2], Input 2: A = [3, 2, 1] Output 2: [1, 2, 3]",
  "Given an array, of size n, reverse it",
  "Given an array, of size n, reverse it. Example: If array, arr = [1,2,3,4,5], after reversing it, the array should be, arr = [5,4,3,2,1] .",
  "Use bubble sort algorithm to sort array",
  "You are given an unsorted array consisting of N non-negative integers. Your task is to sort the array in non-decreasing order using the Bubble Sort algorithm.Ex. Bubble Sort implementation for the given array:  [6,2,8,4,10] is array: [2,4,6,8,10]. ",
  "Maximum Swap",
  "You are given an integer num. You can swap two digits at most once to get the maximum valued number. Return the maximum valued number you can get.Ex. Input: num = 2736 Output: 7236",
  "Use Selection sort algorithm to sort array",
  "You are given an unsorted array consisting of N non-negative integers. Your task is to sort the array in non-decreasing order using the Selection Sort algorithm.Ex. Selection Sort implementation for the given array:  [6,2,8,4,10] is array: [2,4,6,8,10]. ",
];
var p_string_no;

var speed = 1000 * (1 / 5);

var p_code = ``;

function Code_visualization() {
  const [loading, setloading] = useState(false);

  const { state } = useLocation();
  const problem_no = state.problem_no;

  p_string_no =
    problem_no === -1 ? Math.floor(Math.random() * 5) + 1 : problem_no;

  const para_1 = p_string[p_string_no * 2 - 1];

  const para_2 = p_string[p_string_no * 2];

  console.log(p_string_no)
  if (p_string_no==1) {
    p_code = `
#Input list should be declared before function
arr = [20,10,80,70,60,50] 
      
def find_next(arr):
    
  n =len(arr)
    
  i = n-1
  while(i>0):
    if(arr[i]>arr[i-1]):
      break
    i-=1
    
  if(i==0):
    return arr
    
  mini_i = i
    
  for j in range(i+1,n):
    if(arr[j]<arr[mini_i]):
      mini_i = j
    
  arr[mini_i],arr[i-1] = arr[i-1],arr[mini_i]  
    
  for k in range(0,n-i):
    for j in range(i, n-k-1):
      if arr[j] > arr[j+1]:
        arr[j], arr[j+1] = arr[j+1], arr[j]
          
  return arr
      
array = find_next(arr)
      
print(array)
`}

if (p_string_no==2) {
 p_code=`
#Input list should be declared before function
arr = [121, 91, 213, 115, 67, 23, 124, 213,89]
    
def reverse(arr):
  
  n = len(arr)
  
  for i in range(n//2):
    if(arr[i] != arr[n-i-1]):
      arr[i],arr[n-i-1]=arr[n-i-1],arr[i]
        
  return arr
    
array = reverse(arr)
    
print(array)
`}

if (p_string_no==3) {
  p_code=`
#Input list should be declared before function
arr = [121, 91, 213, 115]
    
def bubble_sort(arr):
  
  n = len(arr)
  
  for i in range(0,n-1):
    for j in range(0,n-i-1):
      if arr[j]>arr[j+1]:
        arr[j],arr[j+1] = arr[j+1],arr[j]
        
  return arr
    
array = bubble_sort(arr)
    
print(array)
`}

if (p_string_no==4) {
  p_code=`
#Input list should be declared before function
arr = [40,90,60,50,80]
    
def max_swap(arr):
  
  n = len(arr)
  max_digit = -1
  max_digit_indx = -1
  l_indx = -1
  r_indx = 1
  
  for i in range(n - 1, -1, -1):
          
    if arr[i] > max_digit:
      max_digit = arr[i]
      max_digit_indx = i
      continue
   
    if arr[i] < max_digit:
      l_indx = i
      r_indx = max_digit_indx
   
  if l_indx == -1:
    return array
   
  arr[l_indx], arr[r_indx] = arr[r_indx], arr[l_indx]
        
  return arr
    
array = max_swap(arr)
    
print(array)`}

if (p_string_no==5) {
  p_code=`
#Input list should be declared before function
arr = [121, 91, 213, 115]
    
def selection_sort(arr):
  
  n = len(arr)
  
  for i in range(n):
    min_idx = i
    for j in range(i+1, n):
      if arr[min_idx] > arr[j]:
          min_idx = j
                  
    arr[i], arr[min_idx] = arr[min_idx], arr[i]
        
  return arr
    
array = selection_sort(arr)
    
print(array)    
`}

const [code, setCode] = useState(p_code);

  function handleEditorChange(value, event) {
    document.getElementById("error").innerHTML = "";
    play.display = "block";
    pause.display = "none";
    var killId = setTimeout(function () {
      for (var j = killId; j > 0; j--) clearTimeout(j);
    });
    inputSlider_2.value = 0;
    i = 0;
    var val = 100 * (Number(inputSlider_2.value) / inputSlider_2.max);
    inputSlider_2.style.background =
      "linear-gradient(to right, #23232e " +
      val.toString() +
      "%, #ddd " +
      val.toString() +
      "%)";
    setCode(value);
    bar_set(0);
  }

  window.addEventListener("resize", (event) => {
    bar_set(3);
  });

  function bar_set(bar) {
    try {
      var ar_str = "[]";
      for (var m = 0; m < code.length; m++) {
        if (code[m] == "=") {
          ar_str = "";
          m++;
          while (code[m] != "\n") {
            if (code[m] != " ") {
              ar_str += code[m];
            }
            m++;
          }
          break;
        }
      }
      const array = JSON.parse(ar_str);

      var bar_numbers = document.getElementById("lo").clientWidth / 34;
      var width = "32px";

      if (array.length > bar_numbers) {
        width =
          (
            document.getElementById("lo").clientWidth / array.length -
            2
          ).toString() + "px";
      }

      if (bar == 3) {
        var bar_len = document.getElementsByClassName("array-no");
        for (var non = 0; non < bar_len.length; non++) {
          bar_len[non].style.fontSize =
            (parseInt(width) / 1.8).toString() + "px";
        }

        var bar_len_2 = document.getElementsByClassName("array-bar");
        for (var non = 0; non < bar_len.length; non++) {
          bar_len_2[non].style.width = width;
        }
      } else {
        document.getElementById("lo").innerHTML = "";

        array.map((value) => {
          const el_1 = document.createElement("div");
          el_1.innerHTML = value.toString();
          el_1.classList.add("array-no");
          el_1.style.fontSize = (parseInt(width) / 1.8).toString() + "px";

          const el = document.createElement("div");
          el.classList.add("array-bar");
          el.style.backgroundColor = PRIMARY_COLOR;
          el.style.height = value.toString() + "px";
          el.style.width = width;

          const el_out = document.createElement("div");
          el_out.classList.add("array-outer");
          el_out.appendChild(el_1);
          el_out.appendChild(el);

          const box = document.getElementById("lo");
          box.appendChild(el_out);
        });
      }
    } catch (error) {}
  }

  useEffect(() => {
    try {
      setTimeout(() => {
        document.getElementsByClassName(
          "monaco-editor-background"
        )[0].style.backgroundColor = "#282a36";
        document.getElementsByClassName("margin")[0].style.backgroundColor =
          "#282a36";
        document.getElementsByClassName("slider")[0].style.backgroundColor =
          "#6649b8";
        document.getElementsByClassName("slider")[1].style.backgroundColor =
          "#6649b8";
        document.getElementsByClassName("slider")[1].style.width = "0.25rem";
        document.getElementsByClassName("scrollbar")[1].style.width = "0.25rem";
        document.getElementsByTagName("canvas")[0].style.width = "0.25rem";
      }, 500);
    } catch (error) {
      setTimeout(() => {
        document.getElementsByClassName(
          "monaco-editor-background"
        )[0].style.backgroundColor = "#282a36";
        document.getElementsByClassName("margin")[0].style.backgroundColor =
          "#282a36";
        document.getElementsByClassName("slider")[0].style.backgroundColor =
          "#6649b8";
        document.getElementsByClassName("slider")[1].style.backgroundColor =
          "#6649b8";
        document.getElementsByClassName("slider")[1].style.width = "0.25rem";
        document.getElementsByClassName("scrollbar")[1].style.width = "0.25rem";
        document.getElementsByTagName("canvas")[0].style.width = "0.25rem";
      }, 1000);
    }

    pause = document.getElementsByClassName("pause")[0].style;
    play = document.getElementsByClassName("play")[0].style;

    play.pointerEvents = "none";

    inputSlider_2 = document.getElementById("lower-input");
    const slideValue = document.getElementById("text-c");
    const inputSlider = document.querySelector("input");

    inputSlider.addEventListener("mouseup", () => {
      let value = inputSlider.value;
      speed = 1000 * (1 / value);
      console.log(speed);

      (function () {
        var killId = setTimeout(function () {
          for (var i = killId; i > 0; i--) clearTimeout(i);
        });
      })();

      i = inputSlider_2.value;
      if (
        document.getElementsByClassName("pause")[0].style.display == "block"
      ) {
        console.log(code);
        checkCode(3);
      }
    });

    inputSlider.oninput = () => {
      let value = inputSlider.value;
      slideValue.innerHTML = value;
    };

    bar_set(0);
  },);

  function checkCode(check) {
    play.pointerEvents = "";
    if (check == 2) {
      bar_set(1);
    }

    setloading(true);
    document.getElementById("myNav").style.display = "block";

    axios
      .post(baseURL, { code })
      .then((responce) => {
        setloading(false);
        document.getElementById("myNav").style.display = "none";
        var cou = 0;
        var erro = responce.data.error;

        if (check === 1 || check === 2) {
          play.display = "none";
          pause.display = "block";
        }

        console.log(responce);
        var inx_speed = 0;
        var cout = 0;

        if (check === 2) {
          if (responce.data.out != undefined) {
            document.getElementById("error").innerHTML = responce.data.out;
            document.getElementById("error").style.color = "#569cd6";
          }

          if (responce.data.error != undefined) {
            play.display = "block";
            pause.display = "none";
            for (var m = 0; m < erro.length; m++) {
              if (erro[m] == "," && cou == 0) {
                cou = m + 1;
              }
            }
            document.getElementById("error").innerHTML = erro
              .slice(cou)
              .replace("^", "");
            document.getElementById("error").style.color = "brown";

            document.getElementById("error").scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });

            return;
          }

          anim = responce.data.result;
          animations = JSON.parse(anim);
          inputSlider_2.max = animations.length;
          if (animations.length == 0) {
            play.display = "block";
            pause.display = "none";
          }
        }

        for (i; i < animations.length; i++) {
          if (cout == 0 && check != 0 && check != -1) {
            setTimeout(() => {
              document.getElementsByTagName("svg")[5].style.pointerEvents = "";
              document.getElementsByTagName("svg")[7].style.pointerEvents =
                "none";
              document.getElementsByTagName("svg")[8].style.pointerEvents =
                "none";
              pause.display = "none";
              play.display = "block";
            }, speed * (animations.length - i));
            cout++;
          }

          const arrayBars = document.getElementsByClassName("array-bar");
          const arrayBars_no = document.getElementsByClassName("array-no");
          var color_no = animations[i][0];
          var isColorChange = true;

          if (color_no === 2) {
            isColorChange = false;
          }
          if (isColorChange == true) {
            const barOne = animations[i];

            const color = color_no === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            (function (index, idx, c_no) {
              setTimeout(() => {
                console.log(index);
                console.log(animations[index][1]);
                console.log(inputSlider_2.value);
                inputSlider_2.value = Number(inputSlider_2.value) + 1;
                var val =
                  100 * (Number(inputSlider_2.value) / inputSlider_2.max);
                inputSlider_2.style.background =
                  "linear-gradient(to right, #23232e " +
                  val.toString() +
                  "%, #ddd " +
                  val.toString() +
                  "%)";
                if (check === -1) {
                  inputSlider_2.value = Number(inputSlider_2.value) - 1;
                  var val =
                    100 * (Number(inputSlider_2.value) / inputSlider_2.max);
                  inputSlider_2.style.background =
                    "linear-gradient(to right, #23232e " +
                    val.toString() +
                    "%, #ddd " +
                    val.toString() +
                    "%)";
                }

                for (var k = 1; k < barOne.length; k++) {
                  arrayBars[barOne[k]].style.backgroundColor = color;
                }

                animations[index][0] = c_no === 0 ? 1 : 0;
              }, idx * speed);
            })(i, inx_speed, color_no);
          } else {
            (function (index, idx) {
              setTimeout(() => {
                console.log(index);
                console.log(animations[index][1]);
                console.log(inputSlider_2.value);
                inputSlider_2.value = Number(inputSlider_2.value) + 1;
                var val =
                  100 * (Number(inputSlider_2.value) / inputSlider_2.max);
                inputSlider_2.style.background =
                  "linear-gradient(to right, #23232e " +
                  val.toString() +
                  "%, #ddd " +
                  val.toString() +
                  "%)";
                if (check === -1) {
                  inputSlider_2.value = Number(inputSlider_2.value) - 1;
                  var val =
                    100 * (Number(inputSlider_2.value) / inputSlider_2.max);
                  inputSlider_2.style.background =
                    "linear-gradient(to right, #23232e " +
                    val.toString() +
                    "%, #ddd " +
                    val.toString() +
                    "%)";
                }
                const [c0_no, barOneIdx, newHeight] = animations[index];
                const barOneStyle = arrayBars[barOneIdx].style;
                arrayBars_no[barOneIdx].innerHTML = newHeight.toString();

                animations[index][2] = parseInt(
                  barOneStyle.height.replace("px", "")
                );

                barOneStyle.height = newHeight.toString() + "px";
              }, idx * speed);
            })(i, inx_speed);
          }

          document.getElementsByTagName("svg")[5].style.pointerEvents = "";
          document.getElementsByTagName("svg")[8].style.pointerEvents = "";

          if (check == 1 || check == 2) {
            console.log("workm workm");
            document.getElementsByTagName("svg")[5].style.pointerEvents =
              "none";
            document.getElementsByTagName("svg")[8].style.pointerEvents =
              "none";
          }

          if (check != -1 && check != 0) {
            inx_speed++;
          }

          if (check === 0 || check === -1) {
            break;
          }
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div id="myNav" className="overlay">
        <div className="overlay-content">
          <GridLoader
            color="#36d7b7"
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="loading">Loading...</div>
        </div>
      </div>

      <div className="problem-container">
        <section className="problem-top">
          <p id="para_1" className="problem-title">
            {para_1}
          </p>
          <p id="para_2" className="problem-statment">
            {para_2}
          </p>
        </section>

        <section className="problem-bottom">
          <div className="visual">
            <div className="vis-container">
              <section className="range-container">
                <div className="field t-f">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    defaultValue="5"
                    steps="1"
                  />
                  <div className="value right" id="text-c">
                    5
                  </div>
                </div>

                <div className="field l-f">
                  <input
                    id="lower-input"
                    type="range"
                    min="0"
                    max="0"
                    defaultValue="0"
                    steps="1"
                  />
                  <div className="svg-container">
                    <svg
                      onClick={() => {
                        if (Number(inputSlider_2.value) > 0) {
                          document.getElementsByTagName(
                            "svg"
                          )[8].style.pointerEvents = "";
                          document.getElementsByTagName(
                            "svg"
                          )[5].style.pointerEvents = "none";
                          inputSlider_2.value = Number(inputSlider_2.value) - 1;
                          var val =
                            100 *
                            (Number(inputSlider_2.value) / inputSlider_2.max);
                          inputSlider_2.style.background =
                            "linear-gradient(to right, #23232e " +
                            val.toString() +
                            "%, #ddd " +
                            val.toString() +
                            "%)";
                          i = inputSlider_2.value;
                          (function () {
                            var killId = setTimeout(function () {
                              for (var i = killId; i > 0; i--) clearTimeout(i);
                            });
                          })();

                          checkCode(-1);
                        }
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M267.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29V96c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160L64 241V96c0-17.7-14.3-32-32-32S0 78.3 0 96V416c0 17.7 14.3 32 32 32s32-14.3 32-32V271l11.5 9.6 192 160z" />
                    </svg>
                    <svg
                      className="pause"
                      onClick={() => {
                        pause.display = "none";
                        play.display = "block";
                        var killId = setTimeout(function () {
                          for (var j = killId; j > 0; j--) clearTimeout(j);
                        });
                        document.getElementsByTagName(
                          "svg"
                        )[5].style.pointerEvents = "";
                        document.getElementsByTagName(
                          "svg"
                        )[8].style.pointerEvents = "";
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                    </svg>
                    <svg
                      onClick={() => {
                        var killId = setTimeout(function () {
                          for (var j = killId; j > 0; j--) clearTimeout(j);
                        });
                        i = inputSlider_2.value;
                        checkCode(1);
                      }}
                      className="play"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                    </svg>
                    <svg
                      onClick={() => {
                        console.log(
                          Number(inputSlider_2.value) == animations.length - 1
                        );
                        var killId = setTimeout(function () {
                          for (var j = killId; j > 0; j--) clearTimeout(j);
                        });
                        if (Number(inputSlider_2.value) < animations.length) {
                          document.getElementsByTagName(
                            "svg"
                          )[8].style.pointerEvents = "none";
                          i = inputSlider_2.value;
                          checkCode(0);
                        } else {
                          console.log("out");
                        }
                        if (
                          Number(inputSlider_2.value) ==
                          animations.length - 1
                        ) {
                          document.getElementsByTagName(
                            "svg"
                          )[7].style.pointerEvents = "none";
                        }
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4l192 160L256 241V96c0-17.7 14.3-32 32-32s32 14.3 32 32V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V271l-11.5 9.6-192 160z" />
                    </svg>
                  </div>
                </div>
              </section>
              <div className="array-container" id="lo"></div>
            </div>

            <div className="code-btn">
              <button
                className="vis--outline"
                onClick={() => {
                  var killId = setTimeout(function () {
                    for (var j = killId; j > 0; j--) clearTimeout(j);
                  });
                  anim = [];
                  animations = [];
                  document.getElementById("error").innerHTML = "";
                  inputSlider_2.value = 0;
                  i = 0;
                  var val =
                    100 * (Number(inputSlider_2.value) / inputSlider_2.max);
                  inputSlider_2.style.background =
                    "linear-gradient(to right, #23232e " +
                    val.toString() +
                    "%, #ddd " +
                    val.toString() +
                    "%)";
                  checkCode(2);
                }}
              >
                VISUALIZE
              </button>
            </div>
          </div>
          <div className="code">
            <Editor
              id="eode"
              theme="vs-dark"
              language="python"
              value={code}
              onChange={handleEditorChange}
            />
          </div>
        </section>

        <section className="error-l">
          <div className="output">
            <p>OUTPUT:</p>
            <p id="error"></p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Code_visualization;
