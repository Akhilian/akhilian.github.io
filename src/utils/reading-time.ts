// Temps de lecture estimé, à 200 mots par minute.
export function readingTime(markdown: string): number {
    const words = markdown.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
    return Math.max(1, Math.round(words / 200));
}
