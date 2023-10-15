export const convertDateToTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);

    const diff = now.getTime() - then.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours >= 24) {
        return `${Math.floor(hours / 24)} days ago`;
    } else if (hours >= 1) {
        return `${hours} hours ago`;
    } else if (minutes >= 1) {
        return `${minutes} minutes ago`;
    } else {
        return `${seconds} seconds ago`;
    }
};
