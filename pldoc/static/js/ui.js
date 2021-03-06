define(
    [
        'jquery',
        './tabs.js',
        './size-slider.js',
        './color-contrast.js',
        'edx-pattern-library/js/select-replace.js',
        'edx-ui-toolkit/js/disclosure/disclosure-view.js'
    ], function($, smoothScroll, Tabs, IconSlider, ColorContrast, DisclosureView) {
        'use strict';

        var Ui = {

            // JS is enabled/available
            init: function() {
                Ui.setupHtml();
                Ui.smoothScrollLink();
                Ui.openNewWindow();
                Ui.navigationHighlight();
                Ui.setupPalettes();
                Ui.listenForPaletteClick();
            },

            setupHtml: function() {
                $('html').removeClass('no-js');
                $('.pldoc-nav-patterns .pldoc-link').each(function (index, element) {
                    var $el = $( element );
                    if ( $el.attr('href') === window.location.pathname ) {
                        $el.addClass('is-current');
                        return false;
                    }
                });
            },

            setupPalettes: function() {
                $('.example').each(function(i, el) {
                    var $el = $(el),
                        rgb = $el.css('backgroundColor');

                    $el.find('.color-meta .color-rgb').text(rgb);
                    $el.find('.color-meta .color-hex').text(Ui.rgbaToHex(rgb));
                });
            },

            // smoothscroll to target links
            smoothScrollLink: function(event) {
                $('a[href^="#"]').not('.pldoc-tab-wrapper .pldoc-link').on('click', function(event) {
                    event.preventDefault();

                    var target = $(event.currentTarget).attr('href');

                    $('html, body').stop().animate({
                        scrollTop: $(target).offset().top
                    }, 1000, 'swing', function() {
                        Ui.sendFocus(target);
                    });
                });
            },

            sendFocus: function(target) {
                $(target).find('.pldoc-pattern-title:first').attr('tabindex', '-1').focus();
            },

            openNewWindow: function() {
                $('a[rel="external"]').on('click', function(event) {
                    e.preventDefault();
                    window.open($(event.currentTarget).attr('href'));
                });
            },

            // smoothscroll to target links
            navigationHighlight: function() {
                $('.pldoc-nav-patterns .pldoc-link').on('click', function(event) {
                    $('.pldoc-nav-patterns .pldoc-link').removeClass('is-current');
                    $(event.currentTarget).addClass('is-current');
                });
            },

            // open external links in new windows
            newWindowLink: function(event) {
                e.preventDefault();
                window.open($(event.currentTarget).attr('href'));
            },

            rgbaToHex: function(rgb) {
                if (typeof(rgb) !== 'undefined') {
                    var _rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i),
                        hex;

                    hex = (_rgb && _rgb.length === 4) ? '#' +
                    ('0' + parseInt(_rgb[1],10).toString(16)).slice(-2) +
                    ('0' + parseInt(_rgb[2],10).toString(16)).slice(-2) +
                    ('0' + parseInt(_rgb[3],10).toString(16)).slice(-2) : '';

                    return hex;
                }
            },

            selectText: function(textToBeSelected) {
                // this selects all the text in an element
                // http://stackoverflow.com/questions/12243898/how-to-select-all-text-in-contenteditable-div
                var doc = document,
                    range, selection,
                    element = textToBeSelected[0];

                if (doc.body.createTextRange) {
                    range = doc.body.createTextRange();
                    range.moveToElementText(element);
                    range.select();
                } else if (window.getSelection) {
                    selection = window.getSelection();
                    range = doc.createRange();
                    range.selectNodeContents(element);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            },

            listenForPaletteClick: function() {
                $('.is-copyable').on('click', function() {
                    Ui.selectText($(event.currentTarget));
                });
            }
        };

        Ui.init();
    });
