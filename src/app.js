import {page, render} from './lib.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { detailsPage } from './views/details.js';
import { logout } from './api/data.js';
import * as api from './api/data.js';
import { createPage } from './views/create.js';
import { getUserData } from './util.js';
import { editPage } from './views/edit.js';
import { myBooksPage } from './views/myBooks.js';

window.api = api;


const root = document.getElementById('site-content');
document.getElementById('logoutBtn').addEventListener('click', onLogout);


updateUserNavigate()
page(decorateContext);
page('/', catalogPage );
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/addbook', createPage)
page('/edit/:id', editPage);
page('/mybook', myBooksPage)

page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    ctx.updateUserNavigate = updateUserNavigate;
    next();
}

function onLogout() {
    logout();
    updateUserNavigate();
    page.redirect('/')
}

export function updateUserNavigate() {
    const userData = getUserData();

    if(userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('.navbar span').textContent = `Welcome, ${userData.email}`
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}
