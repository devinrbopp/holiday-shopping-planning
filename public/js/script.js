document.addEventListener('DOMContentLoaded', function() {
    console.log('it is working!!!!!!!!!!!')
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });