import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios.get("/api/posts").then((d: any) => console.log(d.data));
  }, []);
  return (
    <div>
      maxim
      <img src="/3/image-1628418013687.png" alt="" />
    </div>
  );
};

export default App;
