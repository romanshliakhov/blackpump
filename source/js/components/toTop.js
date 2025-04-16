document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.up-btn')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});