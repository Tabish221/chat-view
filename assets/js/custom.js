$(document).ready(function () {
    $("li:first-child").addClass("first");
    $("li:last-child").addClass("last");
    $('[href="#"]').attr("href", "javascript:;");

    $('.js-example-basic-multiple, .dw-select-multiple, .select2-popup, .select2-popupCenter, .select2-addTaskPopup, .select2-openTaskPopup, .select2-openSubTaskPopup').select2({
        placeholder: "Select a Assignee",
        allowClear: true
    });

    customSelect();
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Sticky Navigation
$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
        $(".fixed").addClass("sticky");
    } else {
        $(".fixed").removeClass("sticky");
    }
});

// Navigation Menu 
$(window).on('load', function () {
    var currentUrl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    $('ul.menu li a').each(function () {
        var hrefVal = $(this).attr('href');
        if (hrefVal == currentUrl) {
            $(this).removeClass('active');
            $(this).closest('li').addClass('active')
            $('ul.menu li.first').removeClass('active');
        }
    });
});

// Specific class not target function
document.body.addEventListener('click', function (e) {
    var nTarget = $(e.target).closest('.customSelect');

    if (nTarget.length == 0) {
        customSelectClosed();
    }

    var aTarget = $(e.target).closest('.selectTeam');

    if (aTarget.length == 0) {
        $('.selectTeam-view').slideUp();
    }

    var aTarget = $(e.target).closest('.selectUser');

    if (aTarget.length == 0) {
        $('.selectUser-view').slideUp();
    }
});

// Tabbing JS
$('[data-targetit]').on('click', function (e) {
    $(this).addClass('current');
    $(this).siblings().removeClass('current');
    var target = $(this).data('targetit');
    $('.' + target).siblings('[class^="box-"]').hide();
    $('.' + target).fadeIn();
    $(".tab-slider").slick("setPosition");
});

// DRILL TABLE CODE
document.addEventListener('DOMContentLoaded', function () {
    const expandableButtons = document.querySelectorAll('.expandableBtn');

    expandableButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            const nextRow = row.nextElementSibling;

            if (nextRow && nextRow.classList.contains('expandable')) {
                nextRow.style.display = nextRow.style.display === 'table-row' ? 'none' : 'table-row';
                customSelect();
            }
        });
    });
});

const elements = document.querySelectorAll('*');
elements.forEach((element) => {
    element.addEventListener('scroll', function () {
        customSelect();
    });
});

window.addEventListener('resize', function () {
    customSelect();
});

// MY CUSTOM SELECT
$(document).on('click', '.customSelect-viwe', function () {
    customSelect();
    $('.customSelect-option').slideUp();
    $('.customSelect').removeClass('show');

    var parent = $(this).closest('.customSelect');
    var optionPanel = parent.find('.customSelect-option');

    if (optionPanel.is(':visible')) {
        optionPanel.slideUp();
        parent.removeClass('show');
    } else {
        optionPanel.slideDown();
        parent.addClass('show');
    }
});
$(document).on('click', '.customSelect-optionItems', function () {
    var data = $(this).data('select-value');
    var vls = $(this).html();

    var parent = $(this).closest('.customSelect');
    var viewArea = parent.find('.customSelect-viwe').find('span');
    viewArea.removeAttr('class')
    viewArea.addClass(data);
    viewArea.html(vls)
    customSelectClosed();
});


// ALL POPUP OPEN AND CLOSED CODE HERE
$(document).on('click', '.addTask-btn', function () {
    popupClosed();
    $('.add-overlay').show();
    $('.addTask-popup').show();
    customSelect();
});

$(document).on("click", ".open-center-popup", () => {
    popupClosed();
    $(".add-center-popup").show();
    $(".add-overlay").show();
    customSelect();
});

$(document).on('click', '.opentask-btn', function () {
    popupClosed();
    $('.opentask-popup').show();
    $('.add-overlay').show();
    customSelect();
});

$(document).on('click', '.subtask-btn', function () {
    popupClosed();
    $('.subtask-popup').show();
    $('.add-overlay').show();
    customSelect();
});

$(document).on('click', '.addTask-closedBtn, .add-overlay', function () {
    popupClosed();
});

$(document).on('click', '.addTask-fullScreen', function () {
    if ($(this).hasClass('isOpen')) {
        $('.add-popup').css('width', '950px');
        $(this).html(`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_2789_219" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_2789_219)">
                    <path d="M13.6 18.1C13.6 17.6029 14.0029 17.2 14.5 17.2H15.9271L13.2636 14.5364C12.9121 14.1849 12.9121 13.6151 13.2636 13.2636C13.6151 12.9121 14.1849 12.9121 14.5363 13.2636L17.2 15.9272V14.5C17.2 14.0029 17.603 13.6 18.1 13.6C18.597 13.6 19 14.0029 19 14.5V18.1C19 18.597 18.597 19 18.1 19H14.5C14.0029 19 13.6 18.597 13.6 18.1Z" fill="#999999" />
                    <path d="M10.7364 9.46366C11.0879 9.81514 11.0879 10.3849 10.7364 10.7364C10.3849 11.0879 9.81514 11.0879 9.46363 10.7364L6.80001 8.07286V9.50002C6.80001 9.99706 6.39706 10.4 5.9 10.4C5.40295 10.4 5 9.99706 5 9.50002V5.9C5 5.40296 5.40295 5 5.9 5H9.50002C9.99707 5 10.4 5.40296 10.4 5.9C10.4 6.39705 9.99707 6.80001 9.50002 6.80001H8.07281L10.7364 9.46366Z" fill="#999999" />
                </g>
            </svg>
        `).removeClass('isOpen');
    } else {
        $('.add-popup').css('width', '100vw');
        $(this).html(`
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="none">
                <path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z" fill="#999999"/>
            </svg>
        `).addClass('isOpen');
    }
    customSelect();
});


// TEAM SEARCH
$('.customSearchInput').on('keyup', function () {
    var value = $(this).val().toLowerCase();
    var searchListItems = $(this).closest('.customSearch').find('.customSearchList').find('li');
    $(searchListItems).filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

$(document).on('click', '.selectTeam-btn', function () {
    if ($(this).siblings('.selectTeam-view').is(':visible')) {
        $(this).siblings('.selectTeam-view').slideUp();
    } else {
        $(this).siblings('.selectTeam-view').slideDown();
    }
});

$(document).on('click', '.selectUser-btn', function () {
    if ($(this).siblings('.selectUser-view').is(':visible')) {
        $(this).siblings('.selectUser-view').slideUp();
    } else {
        $(this).siblings('.selectUser-view').slideDown();
    }
});


// SEARCH OPEN AND CLOSED 
$(document).on('click', '.mn-search .icon', function () {
    var parent = $(this).closest('.mn-search');
    var searchInput = parent.find('input');
    console.log('object', parent.is(':visible'))

    if (parent.hasClass('active')) {
        parent.removeClass('active');
        $(this).html(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2773_4545" style="mask-type:alpha" maskUnits="userSpaceOnUse"
                    x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_2773_4545)">
                    <path
                        d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                        fill="#999999" />
                </g>
            </svg>    
        `)
    } else {
        parent.addClass('active');

        $(this).html(`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C94634">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        `)
    }
})



// GLOBLE FUNCTION
function customSelect() {
    $('.customSelect').each(function (indexInArray, valueOfElement) {
        var topVal = $(valueOfElement).offset().top;
        var leftVal = $(valueOfElement).offset().left;
        var heightVal = $(valueOfElement).outerHeight();
        $(valueOfElement).find('.customSelect-option').css('top', topVal + heightVal + 2).css('left', leftVal);
    });
}

function popupClosed() {
    $('.add-overlay').hide();
    $('.add-popup').hide();
}

function customSelectClosed() {
    $('.customSelect-option').slideUp();
    $('.customSelect').removeClass('show');
}


/* RESPONSIVE JS */
if ($(window).width() < 825) {
}