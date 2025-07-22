function search(event) {
  if (event.key === "Enter" || event.type === "click") {
    var input, filter, items, item, txtValue, results;
    input = document.getElementById('searchInput');
    filter = input.value.trim().toUpperCase();
    items = document.querySelectorAll('.item'); // Select all items
    results = document.getElementById('searchResults');
    results.innerHTML = '';

    for (var i = 0; i < items.length; i++) {
      item = items[i];
      txtValue = (item.textContent || item.innerText).toUpperCase(); // Combine text content of h4 and p elements

      if (txtValue.indexOf(filter) > -1) {
        results.innerHTML += '<div class="item">' + item.innerHTML + '</div>';
        // If you want to show the entire item, you can use item.innerHTML instead of results.innerHTML
      }
    }

    if (results.innerHTML === '') {
      results.innerHTML = '<p>No results found</p>';
    }
  }
}
document.getElementById('searchInput').addEventListener('keyup', search);
document.querySelector('button').addEventListener('click', search);