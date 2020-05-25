module.exports = () =>{
    return `<section class="add-sticky">
    <form action="/home/addSticky" method="POST">
        <input type="text" name="note" placeholder="">
        <button>Add</button>
</form>
</section>`
}
