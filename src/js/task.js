$(($) => {

    let reached = 0; // value to get via ajax
    let maxValue = 15;
    let increaseInterval = 2000; // = 2 sec
    let increaseValue = 0.2; // amount to increase

    $(window).on('load', () => {

        $('.goal').text('$' + maxValue);

        $.ajax({
            url: 'http://alex.devel.softservice.org/testapi/',
            context: document.body,
            type: 'GET',
            cache: false,
            dataType: 'json',
            success: (data) => {
                reached = data['balance_usd'];
                render(reached);
                startDonation();
            }
        });
    });

    let render = (reachVal) => {
        $('.bar__money').text('$' + reachVal.toFixed(1));
        $('.app_remain').text('$' + (maxValue - reachVal).toFixed(1));
        let percents = 100/maxValue * reachVal;
        $('.bar__filled').css('width', percents + '%');

        if (reachVal > maxValue - increaseValue) {
            $('.app__indicator').addClass('done');
            $('.app__info').css('visibility', 'hidden');
        }
    };

    let startDonation = () => {
        let currentInterval = setInterval(() => {
            if (reached > 0 && reached < maxValue) {
                let remain = maxValue - reached;
                if (remain > increaseValue) {
                    reached += increaseValue;
                } else {
                    reached += remain;
                }
                render(reached);
            } else {
                clearInterval(currentInterval);
            }
        }, increaseInterval);
    };

});