document.querySelectorAll('.custom-select').forEach(setupSelector);
function setupSelector(selector) {

  let isopened = false;
  selector.addEventListener('change', e => {
    isopened = false;
  })

  selector.addEventListener('mousedown', e => {
      e.preventDefault();

      if (!isopened){
      const select = selector.children[0];
      const dropDown = document.createElement('ul');
      dropDown.className = "selector-options";

      [...select.children].forEach(option => {
        const dropDownOption = document.createElement('li');
        dropDownOption.textContent = option.textContent;

        dropDownOption.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          select.value = option.value;
          selector.value = option.value;
          select.dispatchEvent(new Event('change'));
          selector.dispatchEvent(new Event('change'));
          dropDown.remove();
        });

        dropDown.appendChild(dropDownOption);
      });

      selector.appendChild(dropDown);
      isopened = true;
      }else{
        if (e.target === selector.children[0]){
          document.querySelector('ul').remove();
          isopened = false;
        }

        }
      // handle click out
      document.addEventListener('click', (e) => {
        if(!selector.contains(e.target)) {
          if (document.querySelector('ul')){
          document.querySelector('ul').remove();
          isopened = false;
          }
        }
      });
  });
}