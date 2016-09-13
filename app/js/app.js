'use strict';

(function(){
    var app = angular.module('myApp', ['ui.mask']);

    app.controller('MainController', function($scope, $filter){
        var $scope = $scope,
        tzOffset = getTZOffset(),
        options = {
            format: 'Y-m-d',
            mode: 'range',
            separator: ' — ',
            hide_on_select: true,
            position: "bottom"
        };

        $scope.header = "Datepicker Demo";
        $scope.buttonCaption = 'Calendar';
        $scope.calendar = {
            input: document.querySelector('.hidden-calendar'),
            show: showCalendar
        };

        $scope.calendar.input.addEventListener('pickmeup-change', function(e){
            $scope.dates = pickmeup($scope.calendar.input).get_date();
        });

        $scope.calendar.input.addEventListener('pickmeup-show', function(e){
        });

        $scope.calendar.input.addEventListener('pickmeup-hide', function(e){
            setTimeout(function(){
                $scope.$apply(function(){
                    if ($scope.datesModel == '') {
                        $scope.dates = pickmeup($scope.calendar.input).get_date();
                    } else {
                        $scope.dates = parse($scope.datesModel);
                    }
                });
            }, 50);
        });

        
        $scope.$watch(function(){ return $scope.dates; }, function(newValue, oldValue){
            
            console.log('newValue: %s, oldValue: %s, tz: %s', newValue, oldValue, tzOffset);
            if (typeof newValue !== 'undefined') {
                $scope.datesFormatted = pickmeup($scope.calendar.input).get_date(true);
                $scope.datesModel = $filter('date')($scope.dates[0], 'ddMMyyyy', tzOffset) + $filter('date')($scope.dates[1], 'ddMMyyyy', tzOffset);
                console.log($scope);
            }
        });

        function showCalendar (){
            pickmeup($scope.calendar.input).show();
        };

        function getDatesFromCalendar(){
            $scope.dates = pickmeup($scope.calendar.input).get_date(false);
            $scope.datesFormatted = pickmeup($scope.calendar.input).get_date(true);
            if($scope.calendar.input.__pickmeup.options.mode === 'range'){
                console.log('mode is \'range\'');
                $scope.datesModel = $scope.datesFormatted[0] + $scope.calendar.input.__pickmeup.options.separator + $scope.datesFormatted[1];
            } else {
                console.log('mode isn\'t \'range\'');
            }
        }

        function getTZOffset(){
            var offset = new Date().getTimezoneOffset() * -1;
            var sign = offset < 0 ? '-' : '+';
            var hours = Math.abs(offset / 60);
            var minutes = Math.abs(offset % 60);

            if (hours < 10) { hours = '0' + hours;}
            if (minutes < 10) { minutes = '0' + minutes;}

            return sign + hours + minutes;
        }

        // ddMMyyyyddMMyyyy
        function parse(strDates){
            return [new Date(), new Date()];
        }

        pickmeup($scope.calendar.input, options);
        $scope.dates = pickmeup($scope.calendar.input).get_date();

    });
})();

