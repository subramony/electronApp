module.exports = function (countDownFunction) {
    let count = 10;

    let timer = setInterval(function () {
        countDownFunction(count--) ;

        if(count  == -1) {
            clearInterval(timer);
        }
    }, 1000);
}