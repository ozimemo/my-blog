document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[data-autotitle]');
  links.forEach(link => {
    const url = link.getAttribute('href');

    fetch(url)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const h1 = doc.querySelector('h1');
        if (h1) {
          link.textContent = h1.textContent;
        } else {
          link.textContent = '(タイトルなし)';
        }
      })
      .catch(error => {
        console.error('取得失敗:', error);
        link.textContent = '(取得エラー)';
      });
  });
});