exports = module.exports = {
    /*dev details*/
    dev: {
        baseUrl: "http://devweb.fankick.io",
        databaseurl: "mongodb://devfankickadmin:$Dev12345@13.126.33.219:27017/devfankick?poolSize=100" + "&reconnectTries=" + Number.MAX_VALUE,
        port: "9999",
        apiUrl : "https://dev.fankick.io"

    },
     /*qa details*/
    qa: {
        baseUrl: "http://qaweb.fankick.io",
        databaseurl: "mongodb://qafankickadmin:$Qa12345@13.126.33.219:27017/qafankick?poolSize=100" + "&reconnectTries=" + Number.MAX_VALUE,
        port: "9944",
        apiUrl : "https://qa.fankick.io"
    },
     /*preprod details*/
     preprod : {
        baseUrl: "http://prepodweb.fankick.io",
        databaseurl: "mongodb://prepodfankickadmin:$PrePod12345@13.126.33.219:27017/prepodfankick?poolSize=100" + "&reconnectTries=" + Number.MAX_VALUE,
        port: "9966",
        apiUrl : "https://prepod.fankick.io"
    },
    /* prod details*/
    prod: {
        baseUrl: "http://admin.fankick.io",
        databaseurl: "mongodb://livefankickadmin:$FanKickLive1_#9@13.126.83.37:27017/livefankick?poolSize=100" + "&reconnectTries=" + Number.MAX_VALUE,
        port: "8080",
        apiUrl : "https://www.fankick.io"
    },
    /*local details*/
    none: {
        accountName: "fankicklocal",
        accountKey: "w5DhkYW6x3dNStNq5Ozl//u/GgruCvEUk0eGpZd4/vNxcTztKsdybkzyO45lOlzNkgIQR6HDQsknf8L4QYiXLg==",
        blobUrl: "https://fankickdev.blob.core.windows.net/",
        blobContainer: "images",
        baseUrl: "http://localhost:8080",
        databaseurl: "mongodb://devfankickadmin:$Dev12345@13.126.33.219:27017/devfankick?poolSize=1000" + "&reconnectTries=" + Number.MAX_VALUE
    }
}

