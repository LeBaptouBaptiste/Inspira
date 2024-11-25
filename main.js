// Fonction pour récupérer les citations depuis l'API
async function fetchCitations() {
    try {
        const response = await fetch('api.php'); // URL de votre API
        const quotes = await response.json();
        const db = await initApp();

        const quotesContainer = document.getElementById('quotes');
        quotesContainer.innerHTML = ''; // Réinitialiser le contenu

        quotes.forEach((quote) => {
            // Ajouter la citation dans IndexedDB
            addQuote(db, quote.text, quote.author);

            const quoteCard = document.createElement('div');
            quoteCard.classList.add('col-md-4');

            const card = document.createElement('div');
            card.classList.add('card', 'shadow-sm');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const blockquote = document.createElement('blockquote');
            blockquote.classList.add('blockquote', 'mb-0');

            const quoteText = document.createElement('p');
            quoteText.textContent = quote.text; // Utilisation de textContent pour éviter XSS

            const footer = document.createElement('footer');
            footer.classList.add('blockquote-footer');
            footer.textContent = quote.author; // Utilisation de textContent pour éviter XSS

            blockquote.appendChild(quoteText);
            blockquote.appendChild(footer);

            cardBody.appendChild(blockquote);
            card.appendChild(cardBody);
            quoteCard.appendChild(card);

            quotesContainer.appendChild(quoteCard);
        });
    } catch (error) {
        // En cas d'erreur, basculez vers les citations en cache
        fetchCitationsFromCache();
        console.error('Erreur lors de la récupération des citations:', error);
    }
}

async function fetchCitationsFromCache() {
    try {
        const db = await initApp();
        const quotes = await readAllQuotes(db);
        console.log(quotes)

        const quotesContainer = document.getElementById('quotes');
        quotesContainer.innerHTML = ''; // Réinitialiser le contenu

        quotes.forEach((quote) => {

            const quoteCard = document.createElement('div');
            quoteCard.classList.add('col-md-4');

            const card = document.createElement('div');
            card.classList.add('card', 'shadow-sm');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const blockquote = document.createElement('blockquote');
            blockquote.classList.add('blockquote', 'mb-0');

            const quoteText = document.createElement('p');
            quoteText.textContent = quote.text; // Utilisation de textContent pour éviter XSS

            const footer = document.createElement('footer');
            footer.classList.add('blockquote-footer');
            footer.textContent = quote.author; // Utilisation de textContent pour éviter XSS

            blockquote.appendChild(quoteText);
            blockquote.appendChild(footer);

            cardBody.appendChild(blockquote);
            card.appendChild(cardBody);
            quoteCard.appendChild(card);

            quotesContainer.appendChild(quoteCard);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des citations:', error);
    }
}

// Charger les citations dès que la page est prête
document.addEventListener('DOMContentLoaded', fetchCitations);

// Rafraîchir les citations après l'ajout
document.getElementById('addQuoteForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = document.getElementById('quoteText').value;
    const authorId = document.getElementById('authorId').value;

    try {
        const response = await fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                author_id: parseInt(authorId),
            }),
        });

        const result = await response.json();

        // Rafraîchir la liste des citations si l'ajout a réussi
        if (result.success) {
            fetchCitations();
        }
    } catch (error) {
        console.error('Erreur lors de l’ajout de la citation:', error);
    }
});
