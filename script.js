document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const eventImage = document.getElementById('eventImage');
    const eventImages = [
        'api_conf.jpg',
        'CMfest.png',
        'cudos.jpg',
        'devfest_2022.jpg'
    ];

    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            // Change the event image
            eventImage.src = eventImages[index];
            eventImage.alt = item.querySelector('h3').textContent;
        });
    });
});