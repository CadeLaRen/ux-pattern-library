require.config({
    baseUrl: '/public/js',
    paths: {
        jquery: "/public/js/jquery.min",
        svg4everybody: "/public/js/svg4everybody.min",
    },
    shim: {
        'jquery': {
            exports: 'jquery'
        }
    }
});

require([
    'jquery',
    '/public/js/ui.js',
    '/public/js/svg4everybody.min.js'
    ],
    function($, Ui) {}
);
