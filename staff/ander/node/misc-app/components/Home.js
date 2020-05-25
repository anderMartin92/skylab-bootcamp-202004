module.exports = name => `<section class="home">
<h1>Welcome, ${name}!</h1>

<a class="home__link" href="/home/addContact">ADD CONTACT</a>
<a class="home__link" href="/home/listContact">LIST CONTACTS</a>
<a class="home__link" href="/home/searchContact">SEARCH CONTACT</a>
<a class="home__link" href="/home/addSticky">ADD STICKIES</a>
<a class="home__link" href="/home/searchSticky">SEARCH STICKIES</a>
<a class="home__link" href="/home/listSticky">LIST STICKIES</a>
<form action="/logout" method="POST">
    <button>Logout</button>
</form>
</section>`