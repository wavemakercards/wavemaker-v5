export default {
  mounted(el) {
    const resizeTextarea = () => {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    };
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    el.addEventListener('input', resizeTextarea);
    window.addEventListener('resize', resizeTextarea);
    // Cleanup event listener on unmount
    el._onResize = resizeTextarea;
  },
  updated(el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  },
  unmounted(el) {
    window.removeEventListener('resize', el._onResize);
  }
  };