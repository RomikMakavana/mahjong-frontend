export function random(n = 10) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var chars = '0123456789';
    var token = '';
    for (var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

export function reorderList(arr: any[], user_id: string) {
    const index = arr.findIndex(item => item.user_id === user_id);
    if (index === -1) return arr; // If id not found, return original array

    const part1 = arr.slice(index);
    const part2 = arr.slice(0, index);
    return part1.concat(part2);
}