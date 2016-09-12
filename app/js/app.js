'use strict';

(function(){
    var app = angular.module('myApp', []);

    app.controller('MainController', function($scope){
        var $scope = $scope,
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
            getDatesFromCalendar();
        });

        $scope.calendar.input.addEventListener('pickmeup-show', function(e){
            $scope.buttonCaption = 'Hide';
            console.log('Show calendar: %s', $scope.buttonCaption);
        });

        $scope.calendar.input.addEventListener('pickmeup-hide', function(e){
            $scope.buttonCaption = 'Calendar';
            console.log('Hide calendar: %s', $scope.buttonCaption);
        });


        pickmeup($scope.calendar.input, options);
        getDatesFromCalendar();

        $scope.$watch(function(){ return $scope.datesModel; }, function(newValue, oldValue){
            console.log('newValue: %s, oldValue: %s', newValue, oldValue);
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

    });
})();

