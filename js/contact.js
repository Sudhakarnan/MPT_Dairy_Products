document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(contactForm);
        const fromEmail = 'sudhakarnan011@gmail.com'; // Replace with the desired "from" email address

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                formData: Object.fromEntries(formData),
                fromEmail: fromEmail,
                toEmail: 'info@mpt.com'
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Email sent successfully!');
                contactForm.reset();
            } else {
                alert('Failed to send email. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});