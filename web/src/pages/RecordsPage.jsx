import { useEffect, useState } from "react";

import RecordForm from "../components/RecordForm.jsx";
import RecordList from "../components/RecordList.jsx";

import { getRecords } from "../services/recordsApi.js";

export default function RecordsPage() {
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

    function addRecord(newRecord) {
        setRecords((current) => [
            newRecord,
            ...current,
        ]);
    }

    function deleteRecord(id) {
        setRecords((current) => 
            current.filter(
                (record) => record.id !== id
            )
        );
    }

    if (status === "loading") {
        return <p>Loading records...</p>;
    }

    if (status === "error") {
        return <p>Unable to load records.</p>;
    }

    return (
        <main>
            <h1>Records</h1>

            <RecordForm 
            onAddRecord={addRecord} 
            />

            <RecordList 
                records={records} 
                onDeleteRecord={deleteRecord} 
            />
        </main>
    );
}