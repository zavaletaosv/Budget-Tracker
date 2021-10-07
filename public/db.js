let db;

const request = indexedDB.open('BudgetDB');

request.onupgradeneeded = function (e) {
    db = e.target.result;
    db.createObjectStore('BudgetStore', { autoIncrement: true });
}
