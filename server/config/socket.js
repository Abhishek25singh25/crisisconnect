const initSocket = (io) => {
    io.on("connection",(socket)=> {
        console.log("User connected:",socket.id);

        socket.on("sos:new",(data)=> {
            io.emit("sos:received",data);
        });

        socket.on("sos:accept",(data)=> {
            io.emit("sos:accepted",data);
        });

        socket.on("sos:resolve",(data)=> {
            io.emit("sos:resolved",data);
        });

        socket.on("disconnect",()=> {
            console.log("User disconnect",socket.id);
        });
    });
};

module.exports = initSocket;