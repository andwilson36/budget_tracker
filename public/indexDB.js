

saveRecord = (obj) => {
    request.onsuccess = () => {
        
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
