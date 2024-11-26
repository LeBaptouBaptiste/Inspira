const dbName = 'CitationsDB';
const dbVersion = 2;

const openDB = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains('quotes')) {
                const quoteStore = db.createObjectStore('quotes', { keyPath: 'id', autoIncrement: true });
                quoteStore.createIndex('texte', 'texte', {unique: false});
                quoteStore.createIndex('author', 'author', { unique: false });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            console.error("Erreur lors de l'ouverture de la base de données");
        };
    });
};

const addQuote = async (db, texte, author) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["quotes"], 'readwrite');
        const quotesStore = transaction.objectStore('quotes');
        const ajoutRequete = quotesStore.add({"texte": texte, "author": author});

        ajoutRequete.onsuccess = () => {
            resolve("Citation : " + texte + " de " + author +" ajouté.");
        };

        ajoutRequete.onerror = () => {
            reject("Citation non ajouté");
        };
    });
};

const readQuote = async (db, id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['quotes'], 'readonly');
        const objectStore = transaction.objectStore('quotes');
        const lectureRequete = objectStore.get(id);

        lectureRequete.onsuccess = () => {
            const resultat = lectureRequete.result;
            resolve(resultat);
        };

        lectureRequete.onerror = () => {
            reject("Erreur lors de la lecture");
        };
    });
};

const readAllQuotes = async (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['quotes'], 'readonly');
        const objectStore = transaction.objectStore('quotes');
        
        const request = objectStore.getAll(); // Récupérer toutes les entrées

        request.onsuccess = (event) => {
            const quotes = event.target.result; // Le tableau des citations
            resolve(quotes);
        };

        request.onerror = (event) => {
            reject("Erreur lors de la lecture de toutes les citations.");
        };
    });
};

const clearAllQuotes = async (db) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['quotes'], 'readwrite');
        const objectStore = transaction.objectStore('quotes');

        const request = objectStore.clear();  // Supprime toutes les entrées

        request.onsuccess = () => {
            resolve("Toutes les citations ont été supprimées.");
        };

        request.onerror = () => {
            reject("Erreur lors de la suppression des citations.");
        };
    });
};

const initApp = async () => {
    try {
        const db = await openDB();
        return db;
    } catch (error) {
        console.error('Erreur lors de l\'ouverture de la base de données:', error);
    }
};

document.addEventListener('DOMContentLoaded', initApp);