export default function RecordCard({ record }) {
    return (
        <article>
            <h2>{record.title}</h2>
            <p>Status: {record.status}</p>
        </article>
    );
}