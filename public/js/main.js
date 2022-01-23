const createRow = () => {
    var data = {
        "name": document.getElementById('name').value,
        "last_name": document.getElementById('last_name').value,
        "document_id": document.getElementById('document_id').value
    };

    var payload = JSON.stringify(data);

    fetch('/api/v1/', {
        method: 'POST',
        headers: {
            "Accept": "*/*",
            "Content-type": "application/json"
        },
        body: payload
    })
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            deleteTable('draftTable');
            loadDraftTable();
            resetForm();
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

const deleteRow = () => {
    let value = checkRadioButton();

    var data = {
        "id": value
    };

    var payload = JSON.stringify(data);

    fetch('/api/v1/', {
        method: 'DELETE',
        headers: {
            "Accept": "*/*",
            "Content-type": "application/json"
        },
        body: payload
    })
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            deleteTable('draftTable');
            loadDraftTable();
            resetForm();
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

const updateRow = () => {
    let value = checkRadioButton();

    var data = {
        "id": value,
        "name": document.getElementById('name').value,
        "last_name": document.getElementById('last_name').value,
        "document_id": document.getElementById('document_id').value
    };

    var payload = JSON.stringify(data);

    fetch('/api/v1/', {
        method: 'PATCH',
        headers: {
            "Accept": "*/*",
            "Content-type": "application/json"
        },
        body: payload
    })
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            deleteTable('draftTable');
            loadDraftTable();
            resetForm();
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

const loadDraftTable = () => {
    fetch('/api/v1/draft')
        .then((res) => {
            res.json().then((data) => {
                data.results.forEach(element => {
                    let row = document.createElement('tr');

                    let row_data_1 = document.createElement('td');
                    let newCheckBox = document.createElement('input');
                    newCheckBox.type = 'radio';
                    newCheckBox.value = element.id;
                    newCheckBox.name = 'select_row';
                    row_data_1.appendChild(newCheckBox);

                    let row_data_2 = document.createElement('td');
                    row_data_2.innerHTML = element.values.name;

                    let row_data_3 = document.createElement('td');
                    row_data_3.innerHTML = element.values.last_name;

                    let row_data_4 = document.createElement('td');
                    row_data_4.innerHTML = element.values.document_id;

                    row.appendChild(row_data_1);
                    row.appendChild(row_data_2);
                    row.appendChild(row_data_3);
                    row.appendChild(row_data_4);

                    document.getElementById('draftTable').appendChild(row);
                });
            });
        })
        .catch((err) => {
            console.log('Fetch Error :-S', err);
        });
}

const loadPublishTable = () => {
    fetch('/api/v1')
        .then((res) => {
            res.json().then((data) => {
                data.results.forEach(element => {
                    let row = document.createElement('tr');

                    let row_data_1 = document.createElement('td');
                    row_data_1.innerHTML = element.values.name;

                    let row_data_2 = document.createElement('td');
                    row_data_2.innerHTML = element.values.last_name;

                    let row_data_3 = document.createElement('td');
                    row_data_3.innerHTML = element.values.document_id;

                    row.appendChild(row_data_1);
                    row.appendChild(row_data_2);
                    row.appendChild(row_data_3);

                    document.getElementById('publishTable').appendChild(row);
                });
            });
        })
        .catch((err) => {
            console.log('Fetch Error :-S', err);
        });
}

const loadFunction = () => {
    loadDraftTable();
    loadPublishTable();
}

const deleteTable = (id) => {
    let node = document.getElementById(id);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

const checkRadioButton = () => {
    let radiob = document.querySelectorAll('input[name="select_row"]');
    let value;
    radiob.forEach(element => {
        if (element.checked) {
            value = element.value;
        }
    });
    return value;
}

const publishDraftTable = () => {
    fetch('/api/v1/publish', {
        method: 'POST',
        headers: {
            "Accept": "*/*",
            "Content-type": "application/json"
        },
    })
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
            deleteTable('publishTable');
            loadPublishTable();
            resetForm();
        })
        .catch(function (error) {
            console.log('Request failed', error);
        });
}

const resetForm = () => {
    document.getElementById('form_demo').reset();
}

window.onload = loadFunction;