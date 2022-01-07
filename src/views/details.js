import {html} from '../lib.js';
import {addLike, deleteById, getLikesByBookId, getMylikeByBookId} from '../api/data.js';
import { getById } from '../api/data.js';
import { getUserData } from '../util.js';


const detailsTemplate = (book, isOwner, onDelete, like, showLikeButton, onLike) => html`
       <section id="details-page" class="details">
            <div class="book-information">
                <h3>${book.title}</h3>
                <p class="type">Type: ${book.type}</p>
                <p class="img"><img src="${book.imageUrl}"></p>
                <div class="actions">
                ${isOwner  
                    ? html`<a class="button" href="/edit/${book._id}">Edit</a>
                    <a @click="${onDelete}" class="button" href="#">Delete</a>`
                    : null}
                ${likesControlsTemplate(showLikeButton, onLike)}
                    <div class="likes">
                         <img class="hearts" src="/images/heart.png">
                         <span id="total-likes">Likes: ${like}</span>
                    </div>
                </div>
            </div>
            <div class="book-description">
                <h3>Description:</h3>
                <p>${book.description}</p>
            </div>
        </section>`


const likesControlsTemplate = (showLikeButton, onLike) =>  {
    if(showLikeButton) {//koeto i ot dvete da e true pravi butona da go nqma 
        return html`<a @click=${onLike} class="button" href="#">Like</a>`
    } else {
        return null;
    }
}


export async function detailsPage(ctx) {
    const userData = getUserData();

    const [book, like, hasLike] = await Promise.all([
        getById(ctx.params.id),
        getLikesByBookId(ctx.params.id),
        userData ? (getMylikeByBookId(ctx.params.id, userData.id)) : 0
    ]);


    
    const isOwner = userData && book._ownerId == userData.id;
    const showLikeButton = userData != null && isOwner == false && hasLike == false;
    
    ctx.render(detailsTemplate(book, isOwner, onDelete, like, showLikeButton, onLike));

    async function onDelete() {
        
        const choice = confirm('Are you sure you want to delete?');

        if(choice) {
           await deleteById(ctx.params.id);
           ctx.page.redirect('/')
        }
    }
    async function onLike() { 
       
        await addLike(ctx.params.id);
        ctx.page.redirect('/details/' + ctx.params.id)


    }

}