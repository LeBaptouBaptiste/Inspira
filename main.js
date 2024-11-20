// Fonction pour récupérer les citations depuis l'API
async function fetchCitations() {
    try {
        const response = await fetch('api.php'); // API URL
        const quotes = await response.json();

        const quotesContainer = document.getElementById('quotes');
        quotesContainer.innerHTML = ''; // Réinitialiser le contenu

        quotes.forEach((quote) => {
            const quoteCard = `
                <div class="col-md-4">
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${quote.text}</p>
                                <footer class="blockquote-footer">${quote.author}</footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            `;
            quotesContainer.innerHTML += quoteCard;
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
        alert(result.message);

        // Rafraîchir la liste des citations si l'ajout a réussi
        if (result.success) {
            fetchCitations();
        }
    } catch (error) {
        console.error('Erreur lors de l’ajout de la citation:', error);
    }
});
