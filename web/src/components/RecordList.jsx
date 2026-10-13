import RecordCard from "./RecordCard";

export default function RecordList({ records, onDelete }) {
    if (records.length === 0) return <p>No records yet.</p>;
    return (
        <section>
            {records.map((record) => (
            <RecordCard key={record.id} record={record} onDelete={onDelete} />
            ))}
        </section>
    );
}