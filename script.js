window.onload = function () {
    // Create new script tag
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://bahtiyor-camperfuchs.github.io/camperfuchs-widgets/booking-calendar.js';

    // Create new link tag
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://bahtiyor-camperfuchs.github.io/camperfuchs-widgets/style.css';
    link.type = 'text/css';
    link.media = 'all';

    // Append both tags to the head
    document.head.appendChild(script);
    document.head.appendChild(link);
}