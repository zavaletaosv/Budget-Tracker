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