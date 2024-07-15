document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('edit-time-modal');
    const closeBtn = document.querySelector('.close-btn');
    const saveBtn = document.getElementById('save-time-btn');
    const timeInput = document.getElementById('time-input');
    let currentEditCell;

    // Function to attach event listeners to edit buttons and editable cells
    function attachEventListeners(row) {
        row.querySelector('.edit-time-btn').addEventListener('click', (event) => {
            event.stopPropagation();
            currentEditCell = event.target.parentElement;
            const currentTime = currentEditCell.childNodes[0].nodeValue.trim();
            timeInput.value = currentTime;
            modal.style.display = 'block';
        });

        row.querySelectorAll('.editable').forEach(cell => {
            cell.addEventListener('click', () => {
                const subject = prompt('Enter subject name:');
                const place = prompt('Enter place:');
                if (subject && place) {
                    cell.innerHTML = `<div>${subject}</div><div>${place}</div>`;
                } else if (subject) {
                    cell.innerHTML = `<div>${subject}</div>`;
                } else if (place) {
                    cell.innerHTML = `<div>${place}</div>`;
                }
            });
        });
    }

    document.querySelectorAll('.period-row').forEach(row => {
        attachEventListeners(row);
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

    // Add new row functionality
    const addRowBtn = document.getElementById('add-row-btn');
    const timetableBody = document.querySelector('tbody');

    addRowBtn.addEventListener('click', () => {
        const newRow = document.createElement('tr');
        newRow.classList.add('period-row');
        newRow.innerHTML = `
            <td data-label="Period">New</td>
            <td data-label="Time">--:-- - --:-- <button class="edit-time-btn">Edit</button></td>
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
});
