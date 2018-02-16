'use strict';

$(function ($) {

    var reached = 0; // value to get via ajax
    var maxValue = 15;
    var increaseInterval = 2000; // = 2 sec
    var increaseValue = 0.2; // amount to increase

    $(window).on('load', function () {

        $('.goal').text('$' + maxValue);

        $.ajax({
            url: 'http://alex.devel.softservice.org/testapi/',
            context: document.body,
            type: 'GET',
            cache: false,
            dataType: 'json',
            success: function success(data) {
                reached = data['balance_usd'];
                render(reached);
                startDonation();
            }
        });
    });

    var render = function render(reachVal) {
        $('.bar__money').text('$' + reachVal.toFixed(1));
        $('.app_remain').text('$' + (maxValue - reachVal).toFixed(1));
        var percents = 100 / maxValue * reachVal;
        $('.bar__filled').css('width', percents + '%');

        if (reachVal > maxValue - increaseValue) {
            $('.app__indicator').addClass('done');
            $('.app__info').css('visibility', 'hidden');
        }
    };

    var startDonation = function startDonation() {
        var currentInterval = setInterval(function () {
            if (reached > 0 && reached < maxValue) {
                var remain = maxValue - reached;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRhc2suanMiXSwibmFtZXMiOlsiJCIsInJlYWNoZWQiLCJtYXhWYWx1ZSIsImluY3JlYXNlSW50ZXJ2YWwiLCJpbmNyZWFzZVZhbHVlIiwid2luZG93Iiwib24iLCJ0ZXh0IiwiYWpheCIsInVybCIsImNvbnRleHQiLCJkb2N1bWVudCIsImJvZHkiLCJ0eXBlIiwiY2FjaGUiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJkYXRhIiwicmVuZGVyIiwic3RhcnREb25hdGlvbiIsInJlYWNoVmFsIiwidG9GaXhlZCIsInBlcmNlbnRzIiwiY3NzIiwiYWRkQ2xhc3MiLCJjdXJyZW50SW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInJlbWFpbiIsImNsZWFySW50ZXJ2YWwiXSwibWFwcGluZ3MiOiI7O0FBQUFBLEVBQUUsVUFBQ0EsQ0FBRCxFQUFPOztBQUVMLFFBQUlDLFVBQVUsQ0FBZCxDQUZLLENBRVk7QUFDakIsUUFBSUMsV0FBVyxFQUFmO0FBQ0EsUUFBSUMsbUJBQW1CLElBQXZCLENBSkssQ0FJd0I7QUFDN0IsUUFBSUMsZ0JBQWdCLEdBQXBCLENBTEssQ0FLb0I7O0FBRXpCSixNQUFFSyxNQUFGLEVBQVVDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFlBQU07O0FBRXZCTixVQUFFLE9BQUYsRUFBV08sSUFBWCxDQUFnQixNQUFNTCxRQUF0Qjs7QUFFQUYsVUFBRVEsSUFBRixDQUFPO0FBQ0hDLGlCQUFLLDRDQURGO0FBRUhDLHFCQUFTQyxTQUFTQyxJQUZmO0FBR0hDLGtCQUFNLEtBSEg7QUFJSEMsbUJBQU8sS0FKSjtBQUtIQyxzQkFBVSxNQUxQO0FBTUhDLHFCQUFTLGlCQUFDQyxJQUFELEVBQVU7QUFDZmhCLDBCQUFVZ0IsS0FBSyxhQUFMLENBQVY7QUFDQUMsdUJBQU9qQixPQUFQO0FBQ0FrQjtBQUNIO0FBVkUsU0FBUDtBQVlILEtBaEJEOztBQWtCQSxRQUFJRCxTQUFTLFNBQVRBLE1BQVMsQ0FBQ0UsUUFBRCxFQUFjO0FBQ3ZCcEIsVUFBRSxhQUFGLEVBQWlCTyxJQUFqQixDQUFzQixNQUFNYSxTQUFTQyxPQUFULENBQWlCLENBQWpCLENBQTVCO0FBQ0FyQixVQUFFLGFBQUYsRUFBaUJPLElBQWpCLENBQXNCLE1BQU0sQ0FBQ0wsV0FBV2tCLFFBQVosRUFBc0JDLE9BQXRCLENBQThCLENBQTlCLENBQTVCO0FBQ0EsWUFBSUMsV0FBVyxNQUFJcEIsUUFBSixHQUFla0IsUUFBOUI7QUFDQXBCLFVBQUUsY0FBRixFQUFrQnVCLEdBQWxCLENBQXNCLE9BQXRCLEVBQStCRCxXQUFXLEdBQTFDOztBQUVBLFlBQUlGLFdBQVdsQixXQUFXRSxhQUExQixFQUF5QztBQUNyQ0osY0FBRSxpQkFBRixFQUFxQndCLFFBQXJCLENBQThCLE1BQTlCO0FBQ0F4QixjQUFFLFlBQUYsRUFBZ0J1QixHQUFoQixDQUFvQixZQUFwQixFQUFrQyxRQUFsQztBQUNIO0FBQ0osS0FWRDs7QUFZQSxRQUFJSixnQkFBZ0IsU0FBaEJBLGFBQWdCLEdBQU07QUFDdEIsWUFBSU0sa0JBQWtCQyxZQUFZLFlBQU07QUFDcEMsZ0JBQUl6QixVQUFVLENBQVYsSUFBZUEsVUFBVUMsUUFBN0IsRUFBdUM7QUFDbkMsb0JBQUl5QixTQUFTekIsV0FBV0QsT0FBeEI7QUFDQSxvQkFBSTBCLFNBQVN2QixhQUFiLEVBQTRCO0FBQ3hCSCwrQkFBV0csYUFBWDtBQUNILGlCQUZELE1BRU87QUFDSEgsK0JBQVcwQixNQUFYO0FBQ0g7QUFDRFQsdUJBQU9qQixPQUFQO0FBQ0gsYUFSRCxNQVFPO0FBQ0gyQiw4QkFBY0gsZUFBZDtBQUNIO0FBQ0osU0FacUIsRUFZbkJ0QixnQkFabUIsQ0FBdEI7QUFhSCxLQWREO0FBZ0JILENBckREIiwiZmlsZSI6InRhc2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKCgkKSA9PiB7XHJcblxyXG4gICAgbGV0IHJlYWNoZWQgPSAwOyAvLyB2YWx1ZSB0byBnZXQgdmlhIGFqYXhcclxuICAgIGxldCBtYXhWYWx1ZSA9IDE1O1xyXG4gICAgbGV0IGluY3JlYXNlSW50ZXJ2YWwgPSAyMDAwOyAvLyA9IDIgc2VjXHJcbiAgICBsZXQgaW5jcmVhc2VWYWx1ZSA9IDAuMjsgLy8gYW1vdW50IHRvIGluY3JlYXNlXHJcblxyXG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAkKCcuZ29hbCcpLnRleHQoJyQnICsgbWF4VmFsdWUpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6ICdodHRwOi8vYWxleC5kZXZlbC5zb2Z0c2VydmljZS5vcmcvdGVzdGFwaS8nLFxyXG4gICAgICAgICAgICBjb250ZXh0OiBkb2N1bWVudC5ib2R5LFxyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVhY2hlZCA9IGRhdGFbJ2JhbGFuY2VfdXNkJ107XHJcbiAgICAgICAgICAgICAgICByZW5kZXIocmVhY2hlZCk7XHJcbiAgICAgICAgICAgICAgICBzdGFydERvbmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCByZW5kZXIgPSAocmVhY2hWYWwpID0+IHtcclxuICAgICAgICAkKCcuYmFyX19tb25leScpLnRleHQoJyQnICsgcmVhY2hWYWwudG9GaXhlZCgxKSk7XHJcbiAgICAgICAgJCgnLmFwcF9yZW1haW4nKS50ZXh0KCckJyArIChtYXhWYWx1ZSAtIHJlYWNoVmFsKS50b0ZpeGVkKDEpKTtcclxuICAgICAgICBsZXQgcGVyY2VudHMgPSAxMDAvbWF4VmFsdWUgKiByZWFjaFZhbDtcclxuICAgICAgICAkKCcuYmFyX19maWxsZWQnKS5jc3MoJ3dpZHRoJywgcGVyY2VudHMgKyAnJScpO1xyXG5cclxuICAgICAgICBpZiAocmVhY2hWYWwgPiBtYXhWYWx1ZSAtIGluY3JlYXNlVmFsdWUpIHtcclxuICAgICAgICAgICAgJCgnLmFwcF9faW5kaWNhdG9yJykuYWRkQ2xhc3MoJ2RvbmUnKTtcclxuICAgICAgICAgICAgJCgnLmFwcF9faW5mbycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBzdGFydERvbmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBjdXJyZW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZWFjaGVkID4gMCAmJiByZWFjaGVkIDwgbWF4VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZW1haW4gPSBtYXhWYWx1ZSAtIHJlYWNoZWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVtYWluID4gaW5jcmVhc2VWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlYWNoZWQgKz0gaW5jcmVhc2VWYWx1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhY2hlZCArPSByZW1haW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZW5kZXIocmVhY2hlZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGN1cnJlbnRJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBpbmNyZWFzZUludGVydmFsKTtcclxuICAgIH07XHJcblxyXG59KTsiXX0=
