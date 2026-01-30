import { useEffect, useState } from "react";
import { authFetch } from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
  authFetch("http://localhost:5000/api/dashboard")

      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return <h1>Welcome {data?.user}</h1>;
}
