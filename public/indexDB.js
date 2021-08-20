const request = window.indexedDB.open("transactions", 1);

request.onupgradeneeded = ({ target }) => {
    const db = target.result;

    const objectStore = db.createObjectStore("transactions");
    objectStore.createIndex("name", "amount");
};

saveRecord = (obj) => {
    request.onsuccess = () => {
        const transaction = db.transaction(["transactions"], "readwrite");
        const transactionsStore = transaction.objectStore("transactions");
        const transactionIndex = transactionsStore.index("Transactions");

        toDoListStore.add({ transaction: obj });

        const getCursorRequest = toDoListStore.openCursor();
        getCursorRequest.onsuccess = e => {
          const cursor = e.target.result;
          if (cursor) {
            console.log(cursor.value);
            cursor.continue();
          } else {
            console.log("No entries left!");
          }
        };
    };
}
