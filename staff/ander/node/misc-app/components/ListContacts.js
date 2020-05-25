function ListContacts(contacts) {
    return `<section class="contacts">
    <h2>Contacts list</h2>
<ul>
    ${contacts.map(({ name }) => `<a href="/home/addContact">${name}</a><br>`).join('')}
</ul>
</section>`
}

module.exports = ListContacts