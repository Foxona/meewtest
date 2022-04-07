

export function toDate(s: string) {
    return new Date(s+"Z").toLocaleString();
}