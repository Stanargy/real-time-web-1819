// add this file to .gitignore
module.exports = {
    google: {
        clientID: '600622886294-qnclq5nprn927mesq8c326d4chh5j105.apps.googleusercontent.com',
        clientSecret: 'JFjaIWtfWsMfCmeXXZR4GQCZ'
    },
    mongodb: {
        // dbURI: 'http://api.mongolab.com/api/1/databases/chat_app/collections/'
        // dbURI:'mongodb://admin:admin123@ds137605.mlab.com:37605/chat_app',
        dbURI: 'mongodb://admin:adminify0@ds143666.mlab.com:43666/minor_rt',
        apiKey: 'hfUCcfvAcZeKoGPCd0TTy5K5ZfQk_UMP'
    },
    session: {
        cookieKey: 'uoewbkdsvijshjksdfkjdsfi'
    },


    // API https://www.alphavantage.co/
    apiGraphData: {

        key: 'b28e34db12fd4c6c4c9486212b882a68dda9171e00dc18e82038ce266177ff85',
        apiURL: 'https://min-api.cryptocompare.com/data/pricemulti?',
        symbolPrefix1: 'fsyms=',
        symbolPrefix2: '&tsyms=',
        apiPrefix: '&api_key=b28e34db12fd4c6c4c9486212b882a68dda9171e00dc18e82038ce266177ff85'
    },

    // get toplist by volume in EUR
    api2:{
        apiURL:'https://min-api.cryptocompare.com/data/top/totalvol?limit=10&tsym=EUR'
    }
};