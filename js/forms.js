// Gestion des formulaires pour le site MTGC

document.addEventListener('DOMContentLoaded', function() {
    initFormTabs();
    initFormValidation();
    initFormSubmission();
});

// Gestion des onglets des formulaires
function initFormTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.contact-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Retirer la classe active de tous les boutons et formulaires
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Afficher le formulaire correspondant
            const targetForm = document.getElementById(`${targetTab}-form`);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });
}

// Validation des formulaires
function initFormValidation() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Validation en temps réel
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Supprimer les messages d'erreur lors de la saisie
                clearFieldError(this);
            });
        });
    });
}

// Validation d'un champ spécifique
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Vérifier si le champ est requis
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ce champ est obligatoire.';
    }
    // Validation spécifique par type
    else if (value) {
        switch (type) {
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Veuillez entrer une adresse courriel valide.';
                }
                break;
                
            case 'tel':
                if (!isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Veuillez entrer un numéro de téléphone valide.';
                }
                break;
                
            case 'file':
                if (field.files.length > 0) {
                    const file = field.files[0];
                    const maxSize = 10 * 1024 * 1024; // 10 MB
                    const allowedTypes = ['.pdf', '.doc', '.docx', '.dwg'];
                    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
                    
                    if (file.size > maxSize) {
                        isValid = false;
                        errorMessage = 'Le fichier ne doit pas dépasser 10 MB.';
                    } else if (!allowedTypes.includes(fileExtension)) {
                        isValid = false;
                        errorMessage = 'Format de fichier non supporté. Utilisez PDF, DOC, DOCX ou DWG.';
                    }
                }
                break;
        }
    }
    
    // Validation spécifique par nom de champ
    if (isValid && value) {
        switch (name) {
            case 'prenom':
            case 'nom':
            case 'nom_complet':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Ce champ doit contenir au moins 2 caractères.';
                }
                break;
                
            case 'entreprise':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Le nom de l\'entreprise doit contenir au moins 2 caractères.';
                }
                break;
                
            case 'description_projet':
                if (value.length < 20) {
                    isValid = false;
                    errorMessage = 'Veuillez fournir une description plus détaillée (minimum 20 caractères).';
                }
                break;
        }
    }
    
    // Afficher ou masquer l'erreur
    if (isValid) {
        clearFieldError(field);
        field.classList.remove('error');
        field.classList.add('valid');
    } else {
        showFieldError(field, errorMessage);
        field.classList.remove('valid');
        field.classList.add('error');
    }
    
    return isValid;
}

// Afficher une erreur pour un champ
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 14px;
        margin-top: 5px;
        display: block;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#dc3545';
}

// Supprimer l'erreur d'un champ
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// Validation complète d'un formulaire
function validateForm(form) {
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

// Soumission des formulaires
function initFormSubmission() {
    const appointmentForm = document.getElementById('appointment-form');
    const quoteForm = document.getElementById('quote-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAppointmentSubmission(this);
        });
    }
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleQuoteSubmission(this);
        });
    }
}

// Gestion de la soumission du formulaire de rendez-vous
function handleAppointmentSubmission(form) {
    if (!validateForm(form)) {
        showMessage('Veuillez corriger les erreurs dans le formulaire.', 'error');
        return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Désactiver le bouton et afficher le chargement
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    submitButton.textContent = 'Envoi en cours...';
    
    // Collecter les données du formulaire
    const formData = new FormData(form);
    const data = {
        type: 'appointment',
        prenom: formData.get('prenom'),
        nom: formData.get('nom'),
        telephone: formData.get('telephone'),
        email: formData.get('email'),
        horaire: formData.get('horaire'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Simuler l'envoi (remplacer par un vrai appel API)
    setTimeout(() => {
        console.log('Données de rendez-vous:', data);
        
        // Réactiver le bouton
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        
        // Afficher le message de succès
        showMessage('Votre demande de rendez-vous a été envoyée avec succès. Nous vous contacterons sous peu.', 'success');
        
        // Réinitialiser le formulaire
        form.reset();
        
        // Supprimer les classes de validation
        const fields = form.querySelectorAll('.valid, .error');
        fields.forEach(field => {
            field.classList.remove('valid', 'error');
            clearFieldError(field);
        });
        
    }, 2000);
}

// Gestion de la soumission du formulaire de soumission
function handleQuoteSubmission(form) {
    if (!validateForm(form)) {
        showMessage('Veuillez corriger les erreurs dans le formulaire.', 'error');
        return;
    }
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Désactiver le bouton et afficher le chargement
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    submitButton.textContent = 'Envoi en cours...';
    
    // Collecter les données du formulaire
    const formData = new FormData(form);
    const data = {
        type: 'quote',
        nom_complet: formData.get('nom_complet'),
        entreprise: formData.get('entreprise'),
        telephone: formData.get('telephone'),
        email: formData.get('email'),
        description_projet: formData.get('description_projet'),
        fichier: formData.get('fichier')
    };
    
    // Simuler l'envoi (remplacer par un vrai appel API)
    setTimeout(() => {
        console.log('Données de soumission:', data);
        
        // Réactiver le bouton
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        
        // Afficher le message de succès
        showMessage('Votre demande de soumission a été envoyée avec succès. Nous analyserons votre projet et vous contacterons rapidement.', 'success');
        
        // Réinitialiser le formulaire
        form.reset();
        
        // Supprimer les classes de validation
        const fields = form.querySelectorAll('.valid, .error');
        fields.forEach(field => {
            field.classList.remove('valid', 'error');
            clearFieldError(field);
        });
        
    }, 2000);
}

// Styles CSS pour la validation des formulaires
const formStyles = document.createElement('style');
formStyles.textContent = `
    .form-group input.valid,
    .form-group select.valid,
    .form-group textarea.valid {
        border-color: #28a745;
        box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
    
    .field-error {
        animation: fadeInError 0.3s ease;
    }
    
    @keyframes fadeInError {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(formStyles);

