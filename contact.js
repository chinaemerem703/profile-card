//  FORM VALIDATION
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.querySelector('[data-testid="test-contact-submit"]');
    const successEl = document.getElementById('success');
    
    //  validation functions
    function isValidName(name) { return name.trim().length > 0; }
    function isValidEmail(email) { return email.includes('@') && email.includes('.'); }
    function isValidMessage(msg) { return msg.trim().length >= 10; }
    
    // Show error
    function showError(id, msg) {
        document.getElementById(id).textContent = msg;
        document.getElementById(id.replace('-error', '')).setAttribute('aria-invalid', 'true');
    }
    
    // Clear error
    function clearError(id) {
        document.getElementById(id).textContent = '';
        document.getElementById(id.replace('-error', '')).setAttribute('aria-invalid', 'false');
    }
    
    // Validate single field
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.id;
        
        if (fieldName === 'name' && !isValidName(value)) {
            showError('name-error', 'Name is required');
            return false;
        }
        if (fieldName === 'email' && !isValidEmail(value)) {
            showError('email-error', 'Valid email required');
            return false;
        }
        if (fieldName === 'subject' && !isValidName(value)) {
            showError('subject-error', 'Subject required');
            return false;
        }
        if (fieldName === 'message' && !isValidMessage(value)) {
            showError('message-error', 'Message must be 10+ characters');
            return false;
        }
        
        clearError(fieldName + '-error');
        return true;
    }
    
    // Check if form is valid
    function isFormValid() {
        const inputs = ['name', 'email', 'subject', 'message'];
        return inputs.every(id => validateField(document.getElementById(id)));
    }
    
    // Character counter
    document.getElementById('message').addEventListener('input', function() {
        const count = this.value.length;
        document.getElementById('char-count').textContent = `${count}/10`;
        validateField(this);
    });
    
    // Real-time validation
    ['name', 'email', 'subject', 'message'].forEach(id => {
        document.getElementById(id).addEventListener('blur', function() {
            validateField(this);
            submitBtn.disabled = !isFormValid();
        });
    });
    
    // Form submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (isFormValid()) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                successEl.hidden = false;
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                document.getElementById('char-count').textContent = '0/10';
            }, 2000);
        }
    });
    
});