// src/app/components/Home/Load/ScriptLoader.js
import { useEffect } from "react";

const ScriptLoader = ({ url, onLoad }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = onLoad;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url, onLoad]);

  return null;
};

export default ScriptLoader;
