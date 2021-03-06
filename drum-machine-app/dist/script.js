import React, {
useState,
useEffect,
useReducer } from
"https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";

const bankOne = [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },

{
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },

{
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

{
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },

{
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },

{
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },

{
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },

{
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },

{
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }];



const bankTwo = [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },

{
  keyCode: 87,
  keyTrigger: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },

{
  keyCode: 69,
  keyTrigger: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },

{
  keyCode: 65,
  keyTrigger: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },

{
  keyCode: 83,
  keyTrigger: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },

{
  keyCode: 68,
  keyTrigger: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },

{
  keyCode: 90,
  keyTrigger: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },

{
  keyCode: 88,
  keyTrigger: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },

{
  keyCode: 67,
  keyTrigger: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }];



function DrumComp({
  keyCode,
  drumId,
  audioId,
  audioSrc,
  power,
  volume,
  updateDisplay })
{
  useEffect(() => {
    document.addEventListener("keypress", playSound);
    return () => {
      document.removeEventListener("keypress", playSound);
    };
  });

  const playSound = e => {
    const keyboardOrMouse = e.key ?
    e.key.toUpperCase() :
    e.target.childNodes[0].id;
    const sound = document.getElementById(keyboardOrMouse);
    const button = sound.parentElement;
    const buttonName = button.id.replace(/-/g, " ");
    updateDisplay(buttonName);
    changeStyle(button);

    if (power) {
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play();
    }
  };

  const changeStyle = element => {
    if (power) {
      element.classList.remove("drum-pad-style", "green-box");
      element.classList.add("active-pad-on");
      return setTimeout(() => {
        element.classList.add("drum-pad-style", "green-box");
        element.classList.remove("active-pad-on");
      }, 100);
    } else {
      element.classList.remove("drum-pad-style", "green-box");
      element.classList.add("active-pad-off");
      return setTimeout(() => {
        element.classList.add("drum-pad-style", "green-box");
        element.classList.remove("active-pad-off");
      }, 100);
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", {
      id: drumId,
      className: "drum-pad drum-pad-style green-box no-select",
      onClick: playSound }, /*#__PURE__*/

    React.createElement("audio", { className: "clip", id: audioId, src: audioSrc }),
    audioId));


}

function DrumPad({ bank, power, volume, updateDisplay }) {
  return bank.map((drumObj, i, padBankArr) => {
    return /*#__PURE__*/(
      React.createElement(DrumComp, {
        keyCode: padBankArr[i].keyCode,
        drumId: padBankArr[i].id,
        audioId: padBankArr[i].keyTrigger,
        audioSrc: padBankArr[i].url,
        power: power,
        volume: volume,
        updateDisplay: updateDisplay }));


  });
}

function DrumMachineApp() {
  const [displayName, setDisplayName] = useState("");
  const [bank, setBank] = useState(bankOne);
  const [power, setPower] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const gantiNama = nama => {
    setDisplayName(nama);
  };

  const whatToDisplay = power ? displayName : "";

  const clearDisplayName = () => {
    setDisplayName("");
  };

  const handleBankCheck = () => {
    if (bank === bankOne) {
      setBank(bankTwo);
      setDisplayName("Smooth Piano Kit");
    } else {
      setBank(bankOne);
      setDisplayName("Heater Kit");
    }
  };

  const handlePowerChange = () => {
    setPower(!power);
    clearDisplayName();
  };

  const adjustVolume = e => {
    setVolume(e.target.value);
    setDisplayName("Volume : " + Math.round(e.target.value * 100));
    setTimeout(() => {
      clearDisplayName();
    }, 400);
  };

  return /*#__PURE__*/(
    React.createElement("div", {
      id: "drum-machine",
      className: "w-screen mx-auto h-screen bg-gray-100 flex flex-col items-center justify-center" }, /*#__PURE__*/

    React.createElement("div", { className: "banner" }, /*#__PURE__*/
    React.createElement("h1", null, "Drum Machine"), /*#__PURE__*/
    React.createElement("div", { id: "author" }, /*#__PURE__*/
    React.createElement("p", null, "by",
    " ", /*#__PURE__*/
    React.createElement("a", { href: "https://sngkr.netlify.app/", target: "_blank" }, "Sangkara")))), /*#__PURE__*/







    React.createElement("div", { className: "flex my-10 mx-auto object-center w-max" }, /*#__PURE__*/

    React.createElement("div", { id: "keyarea", className: "grid grid-cols-3 gap-3 p-5" }, /*#__PURE__*/
    React.createElement(DrumPad, {
      bank: bank,
      power: power,
      volume: volume,
      updateDisplay: gantiNama })), /*#__PURE__*/




    React.createElement("div", {
      id: "control",
      className: "flex flex-col w-min  py-10 px-5 justify-center" }, /*#__PURE__*/


    React.createElement("div", { id: "display", className: "w-52 h-14 mb-5 green-box no-select" }, /*#__PURE__*/
    React.createElement("p", null, whatToDisplay)), /*#__PURE__*/



    React.createElement("div", { id: "power-bank", className: "mb-5 flex flex-row justify-center" }, /*#__PURE__*/
    React.createElement("div", { id: "bank", className: "flex flex-col mr-5 bg-grey-100" }, /*#__PURE__*/
    React.createElement("label", { className: "switch" }, /*#__PURE__*/
    React.createElement("input", {
      type: "checkbox",
      name: "bank",
      onClick: handleBankCheck }), /*#__PURE__*/

    React.createElement("span", { className: "slider round bnk" })), /*#__PURE__*/

    React.createElement("div", { className: "text-center font-semibold no-select" }, /*#__PURE__*/
    React.createElement("p", null, "Bank"))), /*#__PURE__*/


    React.createElement("div", {
      id: "power",
      className: "flex flex-col ml-5 justify-center bg-grey-100" }, /*#__PURE__*/

    React.createElement("label", { className: "switch" }, /*#__PURE__*/
    React.createElement("input", {
      type: "checkbox",
      name: "power",
      onClick: handlePowerChange }), /*#__PURE__*/

    React.createElement("span", { className: "slider round pwr" })), /*#__PURE__*/

    React.createElement("div", { className: "text-center font-semibold no-select" }, /*#__PURE__*/
    React.createElement("p", null, "Power")))), /*#__PURE__*/





    React.createElement("div", {
      id: "volume-control",
      className: "flex justify-center items-center text-center" }, /*#__PURE__*/

    React.createElement("p", { className: "mr-1 text-lg font-semibold w-5 pb-1 no-select" }, "-"), /*#__PURE__*/
    React.createElement("input", {
      type: "range",
      min: "0",
      max: "1",
      step: "0.01",
      value: volume,
      className: "volume-slider",
      id: "volumeRange",
      onChange: adjustVolume }), /*#__PURE__*/

    React.createElement("p", { className: "ml-1 text-lg font-semibold w-5 pb-1 no-select" }, "+"))))));





}

ReactDOM.render( /*#__PURE__*/
React.createElement(React.StrictMode, null, /*#__PURE__*/
React.createElement(DrumMachineApp, null)),

document.getElementById("app"));