import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../api/api";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    authFetch("http://localhost:5000/api/dashboard")
      .then(async (res) => {
        if (res.status === 403) {
          alert("Access denied. Admins only.");
          navigate("/"); // back to login
          return;
        }

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setData(data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  if (!data) return null;

  return <h1>Welcome {data.user}</h1>;
}
