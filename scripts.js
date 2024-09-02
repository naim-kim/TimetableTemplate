document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('edit-time-modal');
    const cellModal = document.getElementById('edit-cell-modal');
    const closeBtn = document.querySelector('.close-btn');
    const closeCellBtn = document.querySelector('.close-cell-btn');
    const saveBtn = document.getElementById('save-time-btn');
    const saveCellBtn = document.getElementById('save-cell-btn');
    const copyCellBtn = document.getElementById('copy-cell-btn'); // New Copy button
    const timeInput = document.getElementById('time-input');
    const subjectInput = document.getElementById('subject-input');
    const placeInput = document.getElementById('place-input');
    const colorInput = document.getElementById('color-input');
    let currentEditCell;
    let copiedContent = null; // Variable to store copied cell content

    // Function to attach event listeners to editable cells
    function attachEventListeners(row) {
        row.querySelectorAll('.editable').forEach(cell => {
            cell.addEventListener('click', () => {
                currentEditCell = cell;
                subjectInput.value = cell.querySelector('.subject') ? cell.querySelector('.subject').textContent : '';
                placeInput.value = cell.querySelector('.place') ? cell.querySelector('.place').textContent : '';
                colorInput.value = cell.style.backgroundColor || '#ffffff'; // Default color
                cellModal.style.display = 'block';
            });
        });

        row.querySelector('td:nth-child(2)').addEventListener('click', (event) => {
            event.stopPropagation();
            currentEditCell = event.target;
            const currentTime = currentEditCell.textContent.trim();
            timeInput.value = currentTime;
            modal.style.display = 'block';
        });
    }

    document.querySelectorAll('.period-row').forEach(row => {
        attachEventListeners(row);
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    closeCellBtn.addEventListener('click', () => {
        cellModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        } else if (event.target === cellModal) {
            cellModal.style.display = 'none';
        }
    });

    saveBtn.addEventListener('click', () => {
        const newTime = timeInput.value;
        if (newTime) {
            currentEditCell.textContent = newTime;
        }
        modal.style.display = 'none';
    });

    saveCellBtn.addEventListener('click', () => {
        const subject = subjectInput.value;
        const place = placeInput.value;
        const color = colorInput.value;
        if (subject && place) {
            currentEditCell.innerHTML = `<div class="subject">${subject}</div><div class="place">${place}</div>`;
        } else if (subject) {
            currentEditCell.innerHTML = `<div class="subject">${subject}</div>`;
        } else if (place) {
            currentEditCell.innerHTML = `<div class="place">${place}</div>`;
        }
        currentEditCell.style.backgroundColor = color; // Set the background color
        cellModal.style.display = 'none';
    });

    // New function to copy cell content
    copyCellBtn.addEventListener('click', () => {
        if (currentEditCell) {
            copiedContent = {
                subject: subjectInput.value,
                place: placeInput.value,
                color: colorInput.value
            };
            cellModal.style.display = 'none'; // Close the modal after copying
        }
    });

    // Attach event listener to paste copied content into a new cell
    document.querySelectorAll('.editable').forEach(cell => {
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault(); // Prevent the default right-click menu
            if (copiedContent) {
                cell.innerHTML = `<div class="subject">${copiedContent.subject}</div><div class="place">${copiedContent.place}</div>`;
                cell.style.backgroundColor = copiedContent.color; // Apply the copied background color
            }
        });
    });

    // Add new row functionality
    const addRowBtn = document.getElementById('add-row-btn');
    const timetableBody = document.querySelector('tbody');

    addRowBtn.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.classList.add('period-row');
        newRow.innerHTML = `
            <td data-label="Period">New</td>
            <td data-label="Time">--:-- - --:--</td>
            <td data-label="Monday" class="editable"></td>
            <td data-label="Tuesday" class="editable"></td>
            <td data-label="Wednesday" class="editable"></td>
            <td data-label="Thursday" class="editable"></td>
            <td data-label="Friday" class="editable"></td>
        `;
        timetableBody.appendChild(newRow);

        // Attach event listeners to the new row
        attachEventListeners(newRow);
    });

    // Save timetable as an image
    saveImageBtn.addEventListener('click', () => {
        html2canvas(document.querySelector('table'), {
            onrendered: function(canvas) {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'timetable.png';
                link.click();
            }
        });
    });
});
