import { useState } from "react";

export default function RecordForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("open");

    function handleSubmit(event) {
        event.preventDefault();
        const cleanTitle = title.trim();
        if (!cleanTitle) return;
        onAdd({ id: Date.now(), title: cleanTitle, status });
        setTitle("");
        setStatus("open");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title <input value={title} onChange={(e) => setTitle(e.target.value)} /></label>
            <label>Status
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="open">Open</option>
                    <option value="close">Closed</option>
                </select>
            </label>
            <button type="submit">Add Record</button>
        </form>
    );
}