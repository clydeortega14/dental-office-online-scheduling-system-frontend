export const toMySQLTimeFromString = (timeStr:string) => {
    const date = new Date(`1970-01-01 ${timeStr}`);

    if(isNaN(date.getTime())){
        throw new Error("Invalid time format");
    }

    return date.toTimeString().split(' ')[0]; // HH:MM:SS
}