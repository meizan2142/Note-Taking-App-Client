/* eslint-disable react-hooks/exhaustive-deps */
import { FaDesktop } from "react-icons/fa";
import { IoIosMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const options = [
    {
      icons: <IoSunny size={30} />,
      text: "light",
    },
    {
      icons: <IoIosMoon size={30} />,
      text: "dark",
    },
    {
      icons: <FaDesktop size={30} />,
      text: "system",
    },
  ];

  const applyTheme = () => {
    if (theme === "dark") {
      element.classList.add("dark");
    } else if (theme === "light") {
      element.classList.remove("dark");
    } else {
      // For "system", follow the user's OS preference
      if (darkQuery.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    applyTheme();
    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const handleChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };
    darkQuery.addEventListener("change", handleChange);
    return () => darkQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <div className="flex gap-5 p-5">
      {options.map((opt) => (
        <button
          onClick={() => setTheme(opt.text)}
          key={opt.text}
          className={`p-2 ${theme === opt.text && "bg-red-500"}`}
        >
          {opt.icons}
        </button>
      ))}
    </div>
  );
}

export default App;
