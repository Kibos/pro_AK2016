(function() {
    'use strict';

    var app = angular.module('myApp', ['pascalprecht.translate'])
        .config(['$translateProvider',function($translateProvider){
            var lang = window.localStorage.lang||'cn';
            $translateProvider.preferredLanguage(lang);

            $translateProvider.useStaticFilesLoader({
                prefix: '/i18n/',
                suffix: '.json'
            });
            $translateProvider.useSanitizeValueStrategy('escapeParameters');
            $translateProvider.useLoaderCache(true); // default is false which means disable
            $translateProvider.use(lang);
        }]);

    app.controller('LanguageSwitchingCtrl', ['$scope', '$translate', function (scope, $translate) {
        scope.switching = function(lang){
            $translate.use(lang);
            window.localStorage.lang = lang;
            window.location.reload();
        };
        scope.cur_lang = $translate.use();
    }]);

    app.filter("T", ['$translate', function($translate) {
        return function(key) {
            if(key){
                return $translate.instant(key);
            }
        };
    }]);

    app.factory('T1', ['$translate', function($translate) {
        var T = {
            T:function(key) {
                if(key){
                    return $translate.instant(key);
                }
                return key;
            }
        }
        return T;
    }]);

})();
