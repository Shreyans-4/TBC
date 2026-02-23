// Modal functionality
const modal = document.getElementById('reservationModal');
const reserveBtns = document.querySelectorAll('.btn-reserve, .btn-reserve-large');
const closeBtn = document.querySelector('.close');
const reservationForm = document.getElementById('reservationForm');

// Open modal
reserveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form submission
reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value
    };
    
    try {
        const response = await fetch('http://localhost:8080/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            alert('Reservation confirmed! We look forward to serving you.');
            modal.style.display = 'none';
            reservationForm.reset();
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Unable to connect to server. Please try again later.');
    }
});

// Smooth scroll for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('VIEW GALLERY')) {
            e.preventDefault();
            document.querySelector('.menu-gallery').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }
    });
});

// Gallery hover effects
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.transition = 'transform 0.3s';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
