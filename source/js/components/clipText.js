import { addCustomClass, removeCustomClass, removeClassInArray, fadeIn, fadeOut } from "../functions/customFunctions.js";

function setupClipFunctionality({ 
	clipSelector = '[data-clip]', 
	btnSelector = '[data-clip-btn]', 
	itemSelector = '[data-clip-item]', 
	transitionStyle = 'max-height 0.4s linear' 
} = {}) {
	const elements = document.querySelectorAll(clipSelector);

	if (!elements.length) return;

	function updateButtonVisibility() {
		elements.forEach((element) => {
			const btn = element.querySelector(btnSelector);
			const box = element.querySelector(itemSelector);

			if (!btn || !box) return;

			// Высота без ограничений
			const fullHeight = box.scrollHeight;
			// Ограниченная высота через CSS (если `max-height: none`, ставим 0)
			const computedStyle = window.getComputedStyle(box);
			const maxHeight = parseInt(computedStyle.getPropertyValue('max-height'), 10) || 0;

			// Если контент больше ограниченной высоты, показываем кнопку, иначе скрываем
			if (fullHeight > maxHeight) {
				fadeIn(btn, 100);
			} else {
				fadeOut(btn, 100);
			}
		});
	}

	// Вызываем проверку при загрузке
	updateButtonVisibility();

	// Вешаем обработчик на ресайз
	window.addEventListener('resize', updateButtonVisibility);

	elements.forEach((element) => {
		const btn = element.querySelector(btnSelector);
		const box = element.querySelector(itemSelector);

		if (!btn || !box) return;

		const computedStyle = window.getComputedStyle(box);
		const originalHeight = parseInt(computedStyle.getPropertyValue('max-height'), 10) || 0;
		const oldText = btn.textContent;

		btn.addEventListener('click', function (e) {
			e.preventDefault();
			const isOpen = box.getAttribute('data-clip-item') === 'true';

			if (!isOpen) {
				box.style.maxHeight = box.scrollHeight + 'px';
				btn.textContent = btn.getAttribute('data-clip-btn');
				fadeOut(btn, 100);
			} else {
				box.style.maxHeight = originalHeight + 'px';
				btn.textContent = oldText;
			}

			box.setAttribute('data-clip-item', !isOpen);
		});

		box.style.transition = transitionStyle;
	});
}


setupClipFunctionality({
	clipSelector: '[data-clip]',
	btnSelector: '[data-clip-btn]',
	itemSelector: '[data-clip-item]',
	transitionStyle: 'max-height 0.4s linear'
});