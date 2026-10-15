var movies = [
  { id: 1, title: "Inception", price: 180 },
  { id: 2, title: "Avengers:Age of Ultron", price: 200 },
  { id: 3, title: "Tenet", price: 160 },
  { id: 4, title: "Interstellar", price: 190 },
  { id: 5, title: "The Odyssey", price: 250 },
];
var bookings = [];
var mList = document.getElementById("m-list");
var mSelect = document.getElementById("m-select");
var tSelect = document.getElementById("t-select");
var uEmail = document.getElementById("u-email");
var uQty = document.getElementById("u-qty");
var bkForm = document.getElementById("bk-form");
var rstBtn = document.getElementById("rst-btn");
var alertBox = document.getElementById("alert");
var priceTag = document.getElementById("price-tag");
var bkTitle = document.getElementById("bk-title");
var srchInput = document.getElementById("srch");
var bkList = document.getElementById("bookings");
function showMovies() {
  for (var i = 0; i < movies.length; i++) {
    mList.innerHTML += `
      <div class="m-card">
        <h4>${movies[i].title}</h4>
        <p>₹${movies[i].price}</p>
      </div>
    `;
    mSelect.innerHTML +=
      '<option value="' + movies[i].id + '">' +
      movies[i].title + " (₹" + movies[i].price + ")" +
      "</option>";
  }
}
function calcPrice() {
  var movieId = parseInt(mSelect.value);
  var qty = parseInt(uQty.value);
  if (movieId && qty > 0) {
    for (var i = 0; i < movies.length; i++) {
      if (movies[i].id === movieId) {
        var total = movies[i].price * qty;
        priceTag.innerText = "₹" + total;
        return;
      }
    }
  }
  priceTag.innerText = "₹0";
}
function showMsg(text, type) {
  alertBox.innerText = text;
  alertBox.className = "alert " + type;
}
function showBookings(searchWord) {
  bkTitle.innerText = "Your Bookings (" + bookings.length + ")";
  bkList.innerHTML = "";
  var filtered = [];
  for (var i = 0; i < bookings.length; i++) {
    var b = bookings[i];
    if (searchWord && !b.movie.toLowerCase().includes(searchWord.toLowerCase())) {
      continue;
    }
    filtered.push(b);
  }
  if (filtered.length === 0) {
    bkList.innerHTML = "<p class='empty-txt'>No bookings found.</p>";
    return;
  }
  for (var j = 0; j < filtered.length; j++) {
    var item = filtered[j];
    bkList.innerHTML += '<div class="bk-item">' + "<div>" + "<h5>" + item.movie + "</h5>" + "<p>Time: " + item.time + " | Tickets: " + item.qty + "</p>" + "<p>Total: ₹" + item.total + " | " + item.email + "</p>" + "</div>" + '<button type="button" class="btn-del" onclick="cancelBooking(' + item.id + ')">Cancel</button>' + "</div>";
  }
}
function cancelBooking(id) {
  var newBookings = [];
  for (var i = 0; i < bookings.length; i++) {
    if (bookings[i].id !== id) {
      newBookings.push(bookings[i]);
    }
  }
  bookings = newBookings;
  showBookings(srchInput.value);
  showMsg("Booking cancelled.", "ok");
}
function resetForm() {
  bkForm.reset();
  priceTag.innerText = "₹0";
  alertBox.className = "alert hide";
}
function handleBooking(e) {
  if (e) {
    e.preventDefault();
  }
  var movieId = parseInt(mSelect.value);
  var time = tSelect.value;
  var email = uEmail.value.trim();
  var qty = parseInt(uQty.value);
  if (!movieId || !time || !email || !uQty.value) {
    showMsg("Please fill in all details.", "err");
    return false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    showMsg("Please enter a valid email.", "err");
    return false;
  }
  if (isNaN(qty) || qty <= 0) {
    showMsg("Tickets must be a positive number.", "err");
    return false;
  }
  var movieName = "";
  var moviePrice = 0;
  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id === movieId) {
      movieName = movies[i].title;
      moviePrice = movies[i].price;
      break;
    }
  }
  var total = moviePrice * qty;
  var newOrder = {id: Date.now(), movie: movieName, time: time, email: email, qty: qty, total: total};
  bookings.push(newOrder);
  showBookings(srchInput.value);
  resetForm();
  showMsg("Booking confirmed for " + movieName + "!", "ok");
  return false;
}
mSelect.addEventListener("change", calcPrice);
uQty.addEventListener("input", calcPrice);
bkForm.addEventListener("submit", handleBooking);
rstBtn.addEventListener("click", resetForm);
srchInput.addEventListener("input", function() {
  showBookings(srchInput.value);
});
showMovies();
showBookings("");
