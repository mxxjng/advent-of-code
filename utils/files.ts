export async function loadTextfile(path: string) {
    return await Bun.file(path).text();
}

// splits the data into lines and cuts off the last empty line
export function prepareLines(data: string) {
    return data.split("\n").slice(0, data.split("\n").length - 1);
}
