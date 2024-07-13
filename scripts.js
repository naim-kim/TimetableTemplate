document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-time-btn');
    const modal = document.getElementById('edit-time-modal');
    const closeBtn = document.querySelector('.close-btn');
    const saveBtn = document.getElementById('save-time-btn');
    const timeInput = document.getElementById('time-input');
    let currentEditCell;

    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            currentEditCell = event.target.parentElement;
            const currentTime = currentEditCell.childNodes[0].nodeValue.trim();
            timeInput.value = currentTime;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    saveBtn.addEventListener('click', () => {
        const newTime = timeInput.value;
        if (newTime) {
            currentEditCell.childNodes[0].nodeValue = newTime + ' ';
        }
        modal.style.display = 'none';
    });

    const editableCells = document.querySelectorAll('.editable');
    editableCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const subject = prompt('Enter subject:');
            if (subject) {
                cell.textContent = subject;
            }
        });
    });
});
