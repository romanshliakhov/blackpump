import AirDatepicker from 'air-datepicker';
import { fadeIn, fadeOut } from "../functions/customFunctions.js";

const locales = {};
function loadLocales() {
    const context = require.context('air-datepicker/locale', false, /\.js$/);
    context.keys().forEach((key) => {
        const lang = key.match(/\/([\w-]+)\.js$/)?.[1];
        if (lang) {
            locales[lang] = context(key).default;
        }
    });
}

loadLocales();

const getCurrentLanguage = () => document.documentElement.lang || 'ru';

const calendars = document.querySelectorAll('[data-calendar]');

const closeAllCalendars = (exceptCalendar = null) => {
    calendars.forEach((calendar) => {
        if (calendar !== exceptCalendar) {
            const airDatepicker = calendar.querySelector('.air-datepicker');

            if (airDatepicker && airDatepicker.style.display !== 'none') {
                fadeOut(airDatepicker, 200, 'none');
            }
        }
    });
};

const reinitializeCalendars = (lang) => {
    calendars.forEach((calendar) => {
        const button = calendar.querySelector('.quote-form__calendar-btn');
        const input = calendar.querySelector('.quote-form__input');
   
        if (calendar.airDatepickerInstance) {
            calendar.airDatepickerInstance.destroy();
        }

        const datepicker = new AirDatepicker(calendar, {
            position: 'center top',
            inline: false,
            locale: locales[lang] || locales['ru'],
            buttons: [
                {
                    content: lang === 'en' ? 'Cancel' : 'Отменить',
                    className: 'main-btn main-btn--transparent',
                    tagName: 'span',
                    onClick: (dp) => {
                        fadeOut(calendar.querySelector('.air-datepicker'), 200, 'none');
                        dp.hide();
                    }
                },
                {
                    content: lang === 'en' ? 'Save' : 'Сохранить',
                    className: 'main-btn',
                    tagName: 'span',
                    onClick: (dp) => {
                        if (input && dp.selectedDates.length) {
                            input.value = dp.selectedDates[0].toLocaleDateString();
                        }
                        fadeOut(calendar.querySelector('.air-datepicker'), 200, 'none');
                        dp.hide();
                    }
                }
            ],
            showEvent: '',
            autoClose: false
        });

        calendar.airDatepickerInstance = datepicker;

        fadeOut(calendar.querySelector('.air-datepicker'), 200, 'none');

        button.addEventListener('click', function (event) {
            event.preventDefault();
            closeAllCalendars(calendar);
            fadeIn(calendar.querySelector('.air-datepicker'), 200, 'grid');
            datepicker.show();
        });
    });
};

reinitializeCalendars(getCurrentLanguage());

const observer = new MutationObserver(() => {
    const newLang = getCurrentLanguage();
    reinitializeCalendars(newLang); 
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
});
