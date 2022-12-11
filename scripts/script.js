// Оптимизировать и привязать к характеристике параментра width
const cardsTitle = document.querySelectorAll('.cards__title');

// for (let i = 0; i < cardsTitle.length; i++) {
//   let cardsTitleText = cardsTitle[i].innerText.split('');
//   if (cardsTitleText.length > 14) {
//     while (cardsTitleText.length > 11) {
//       cardsTitleText.pop();
//     }
//     for(let i = cardsTitleText.length; i != 14; i++) {
//       cardsTitleText[i] = '.';
//     }
//     cardsTitle[i].innerText = cardsTitleText.join('');
//   }
// }

console.log(cardsTitle[0].clientWidth);
