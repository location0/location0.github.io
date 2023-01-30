
var openModalBtn = document.getElementById('open-modal-btn');
var modal = document.getElementById('modal');
var closeBtn = document.getElementsByClassName('close-btn')[0];
var timeInput = document.getElementById('time-input');

openModalBtn.addEventListener('click', function() {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

//点击灰色盒子modal窗口消失
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    console.log("?");
    modal.style.display = 'none';
  }
});

