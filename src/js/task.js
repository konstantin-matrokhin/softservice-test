$(($) => {

    let reached = 0;
    let maxValue = 15;
    let increaseInterval = 2000; // 2 sec

    $(window).on('load', () => {
        $.ajax({
            url: 'http://alex.devel.softservice.org/testapi/',
            context: document.body,
            type: 'GET',
            cache: false,
            dataType: 'json',
            success: (data) => {
                reached = data['balance_usd'];
                fillBar(reached);
                startDonation();
            }
        });
    });

    let fillBar = (reachVal) => {
        let percents = 100/maxValue * reachVal;
        $('.bar__filled').css('width', percents + '%');
    };

    let startDonation = () => {
        let i = 0.2; // amount to increase

        let currentInterval = setInterval(() => {
            if (reached > 0 && reached < maxValue) {
                let remain = maxValue - reached;
                if (remain > i) {
                    reached += i;
                } else {
                    reached += remain;
                }
                fillBar(reached);
            } else {
                clearInterval(currentInterval);
            }
        }, increaseInterval);
    };

});