


module.exports= stickies => {
    
   /*  const handleStickyRemove = (userId, idSticky)=>{
        removeSticky(userId,idSticky, (error, feedback)=> {
            if (error) throw error
            if (feedback) return
            else throw new Error('something went wrong')
        })
    } */

    return `<section class="stickies__list">
    <h2>Stickies list</h2>
<ul>
    ${stickies.map(({ note, id })  => 
    `<li><form action="/list-stickies/${id}" method="GET">${note}<button>trapping</button></form></li>`).join('')}
</ul>
</section>`
}