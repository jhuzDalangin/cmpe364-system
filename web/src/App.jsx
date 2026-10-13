import { useEffect, useState } from "react";
import RecordCard from "./components/RecordCard";
import { getRecords } from "./services/recordsApi";
import RecordsPage from "./pages/RecordsPage";

export default function App() {
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getRecords()
      .then((data) => {
        setRecords(data);
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Unable to load records.</p>;

  return (
    <main>
      {records.map((r) => (
        <RecordCard key={r.id} record={r} />
      ))}
    </main>
  );

  return <RecordsPage />;
}

