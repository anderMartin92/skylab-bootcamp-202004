module.exports = () =>{
    return `<section class="search-sticky">
    <form action="/home/searchSticky" method="POST">
        <input type="text" name="query" placeholder="">
        <button>SEARCH</button>
</form>
</section>`
}
