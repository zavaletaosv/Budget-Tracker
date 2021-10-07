let db;

const request = indexedDB.open('BudgetDB');

request.onupgradeneeded = function (e) {
    db = e.target.result;
    db.createObjectStore('BudgetStore', { autoIncrement: true });
};

request.onsuccess = function (e) {
    db = e.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = function (e) {
    console.log(e.target.errorCode);
}

function saveRecord(record) {
    const transaction = db.transaction(['BudgetStore', 'readwrite']);
    const store = transaction.objectStore('BudgetStore');
    store.add(record);
}

function checkDatabase() {
    const transaction = db.transaction(['BudgetStore', 'readwrite']);
    const store = transaction.objectStore('BudgetStore');
    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then(() => {
                const transaction = db.transaction(['BudgetStore', 'readwrite']);
                const store = transaction.objectStore('BudgetStore');
                store.clear();
            });
        }
    };
}