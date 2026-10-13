export async function getRecords() {
    const response = await fetch("/records.json");
    if (!response.ok) {
        throw new Error("Could not load records");
    }
    return response.json();
}