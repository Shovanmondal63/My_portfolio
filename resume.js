// Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert("Right-click is disabled on this page.");
    });

    // Disable common copy shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+U, Ctrl+Shift+I
        if ((e.ctrlKey && ['c', 'x', 's', 'u'].includes(e.key.toLowerCase())) ||
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i')) {
            e.preventDefault();
            alert("Copying and viewing source are disabled.");
        }
    });