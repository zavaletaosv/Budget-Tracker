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