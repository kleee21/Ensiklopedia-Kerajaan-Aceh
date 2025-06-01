// Get references to the modal and its close button
        const warningModal = document.getElementById('warningModal');
        const closeModalButton = document.getElementById('closeModal');
        const modalContent = warningModal.querySelector('.modal-content');

        /**
         * Shows the warning modal with fade-in and slide-in animations.
         */
        function showWarning() {
            warningModal.classList.remove('hidden');
            // Trigger reflow to ensure animations play
            void warningModal.offsetWidth;
            warningModal.classList.add('show');
            modalContent.classList.add('show');
        }

        /**
         * Hides the warning modal.
         */
        function hideWarning() {
            warningModal.classList.remove('show');
            modalContent.classList.remove('show');
            // Hide after animation completes
            warningModal.addEventListener('animationend', () => {
                if (!warningModal.classList.contains('show')) { // Only hide if not re-shown during animation
                    warningModal.classList.add('hidden');
                }
            }, { once: true });
        }

        // Event listener for right-click (contextmenu)
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault(); // Prevent default right-click menu
            showWarning();
        });

        // Event listener for keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Check for F12
            if (e.key === 'F12') {
                e.preventDefault();
                showWarning();
            }

            // Check for Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS)
            if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.metaKey && e.altKey && e.key === 'I')) {
                e.preventDefault();
                showWarning();
            }

            // Check for Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS)
            if ((e.ctrlKey && e.shiftKey && e.key === 'i') || (e.metaKey && e.altKey && e.key === 'i')) {
                e.preventDefault();
                showWarning();
            }

            // Check for Ctrl+Shift+J (Windows/Linux) or Cmd+Option+J (macOS)
            if ((e.ctrlKey && e.shiftKey && e.key === 'J') || (e.metaKey && e.altKey && e.key === 'J')) {
                e.preventDefault();
                showWarning();
            }

            // Check for Ctrl+Shift+J (Windows/Linux) or Cmd+Option+J (macOS)
            if ((e.ctrlKey && e.shiftKey && e.key === 'j') || (e.metaKey && e.altKey && e.key === 'j')) {
                e.preventDefault();
                showWarning();
            }

            // Check for Ctrl+Shift+C (Windows/Linux) or Cmd+Option+C (macOS)
            if ((e.ctrlKey && e.shiftKey && e.key === 'C') || (e.metaKey && e.altKey && e.key === 'C')) {
                e.preventDefault();
                showWarning();
            }
                
            // Check for Ctrl+Shift+C (Windows/Linux) or Cmd+Option+C (macOS)
            if ((e.ctrlKey && e.shiftKey && e.key === 'c') || (e.metaKey && e.altKey && e.key === 'c')) {
                e.preventDefault();
                showWarning();
            }

            // Check for Ctrl+Shift+K (Firefox DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === 'K') {
                e.preventDefault();
                showWarning();
            }
                
            // Check for Ctrl+Shift+K (Firefox DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === 'k') {
                e.preventDefault();
                showWarning();
            }

            // Check for Ctrl+U (View Source) - though not strictly dev tools, often used for inspection
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                showWarning();
            }

            if (e.ctrlKey && e.key === 'U') {
                e.preventDefault();
                showWarning();
            }
        });

        // Event listener for the close button
        closeModalButton.addEventListener('click', hideWarning);

        // Event listener to close modal when clicking outside the content
        warningModal.addEventListener('click', function(e) {
            if (e.target === warningModal) { // Check if the click was on the overlay itself
                hideWarning();
            }
        });
