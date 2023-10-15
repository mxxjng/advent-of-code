export async function loadTextfile(path: string) {
    return await Bun.file(path).text();
}
