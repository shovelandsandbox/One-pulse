let SOCKET_IO_SERVER = 'http://streaming_server_ip_addr:3333';
let RTMP_SERVER = 'rtmp://streaming_server_ip_addr';

export const setStreamingUrls = (streamingServerIpAddr) => {
    const socketServerAddress = SOCKET_IO_SERVER.replace("streaming_server_ip_addr", streamingServerIpAddr);
    const rtmpServerAddress = RTMP_SERVER.replace("streaming_server_ip_addr", streamingServerIpAddr);
    SOCKET_IO_SERVER = socketServerAddress;
    RTMP_SERVER = rtmpServerAddress;
}

export const getSocketServer = () => {
    return SOCKET_IO_SERVER;
}

export const getRTMPServer = () => {
    return RTMP_SERVER;
}
