let io;

const setIO = (ioInstance) => {
    io = ioInstance;
}

const getIO = () => {
    return io;
}

module.exports = { setIO, getIO }