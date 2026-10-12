import { createContext, useEffect, useState } from "react";


export const ThemeContext = createContext();


export function ThemeProvider({children}) {


const themes = [
   {
   id: 1,
  name: "Midnight Teal",
  preview: "bg-[#222831]",
  background: "#222831",
  card: "#31363F",
  primary: "#76ABAE",
  text: "#EEEEEE",
  border: "#4A525C",
},
  {
  id: 2,
  name: "Sage Nature",
  preview: "bg-green-700",
  background: "#1B211A",
  card: "#628141",
  primary: "#EBD5AB",
  text: "#FFFFFF",
  border: "#8BAE66",
},
  {
  id: 3,
  name: "Deep Purple",
  preview: "bg-purple-900",
  background: "#18122B",
  card: "#393053",
  primary: "#635985",
  text: "#FFFFFF",
  border: "#443C68",
},
  {
  id: 4,
  name: "Mauve Wine",
  preview: "bg-purple-900",
  background: "#49243E",
  card: "#704264",
  primary: "#DBAFA0",
  text: "#FFFFFF",
  border: "#BB8493",
},
{
  id: 5,
  name: "Black Orange",
  preview: "bg-orange-500",
  background: "#000000",
  card: "#233D4D",
  primary: "#FE7F2D",
  text: "#EAECF0",
  border: "#233D4D",
},
{
  id: 6,
  name: "Soft Blush",
  preview: "bg-pink-200",
  background: "#FBEFEF",
  card: "#FFFFFF",
  primary: "#C5B3D3",
  text: "#3A2F3A",
  border: "#F5CBCB",
}
];


const [selectedTheme,setSelectedTheme]=useState(themes[0]);


useEffect(() => {
  console.log("Theme Changed:", selectedTheme);

  document.documentElement.style.setProperty("--bg", selectedTheme.background);
  document.documentElement.style.setProperty("--card", selectedTheme.card);
  document.documentElement.style.setProperty("--primary", selectedTheme.primary);
  document.documentElement.style.setProperty("--text", selectedTheme.text);
  document.documentElement.style.setProperty("--border", selectedTheme.border);
}, [selectedTheme]);



return (

<ThemeContext.Provider 
value={{
themes,
selectedTheme,
setSelectedTheme
}}
>

{children}

</ThemeContext.Provider>


)


}