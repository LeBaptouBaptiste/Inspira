const dbName = 'CitationsDB';
const dbVersion = 1;

const openDB = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains('authors')) {
                const authorStore = db.createObjectStore('authors', { keyPath: 'id', autoIncrement: true });
                authorStore.createIndex('name', 'name', { unique: false });
            }

            if (!db.objectStoreNames.contains('quotes')) {
                const quoteStore = db.createObjectStore('quotes', { keyPath: 'id', autoIncrement: true });
                quoteStore.createIndex('texte', 'texte', {unique: false});
                quoteStore.createIndex('author_id', 'author_id', { unique: false });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

const addAuthor = async (db, nom) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["authors"], 'readwrite');
        const authorStore = transaction.objectStore('authors');
        const ajoutRequete = authorStore.add({name: {nom}});

        ajoutRequete.onsuccess = () => {
            resolve("Auteur : " + nom + "ajouter.");
        }

        ajoutRequete.onerror = () => {
            reject("Auteur non ajouté");
        }
    })
}

const addQuote = async (db, texte, author_id) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["quotes"], 'readwrite');
        const quotesStore = transaction.objectStore('quotes');
        const ajoutRequete = quotesStore.add({texte: {texte}, author_id: {author_id}});

        ajoutRequete.onsuccess = () => {
            resolve("Citation : " + texte + "de" + author_id +"ajouter.");
        }

        ajoutRequete.onerror = () => {
            reject("Citation non ajouté");
        }
    })
}

const initApp = async () => {
    try {
        const db = await openDB();
    } catch (error) {
        console.error('Erreur lors de l\'ouverture de la base de données:', error);
    }
};

document.addEventListener('DOMContentLoaded', initApp);