function debug(msg) {
    if (import.meta.env.DEV) {
        console.log(msg);
    }
}
export {debug}