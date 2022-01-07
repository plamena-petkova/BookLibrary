import {html} from '../lib.js';
import {getAllBooks} from '../api/data.js';



const catalogTemplate = (books) =>  
     html`
<!-- Dashboard Page ( for Guests and Users ) -->
<section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
<!-- Display ul: with list-items for All books (If any) -->
            ${books.length == 0
            ? html`<p class="no-books">No books in database!</p>`
            : html `<ul class="other-books-list">
                ${books.map(bookCard)}
                </ul>`}
</section>`;

const bookCard = (book) => html`  
<li class="otherBooks">
<h3>${book.title}</h3>
<p>Type: ${book.type}</p>
<p class="img"><img src=${book.imageUrl}></p>
<a class="button" href="/details/${book._id}">Details</a>
</li>`;



export async function catalogPage(ctx) {
    const books = await getAllBooks();
    ctx.render(catalogTemplate(books));
}
