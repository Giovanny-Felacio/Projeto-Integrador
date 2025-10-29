function calcDiagonalViewport() {
  const H = window.visualViewport?.height || window.innerHeight;
  const W = window.visualViewport?.width || window.innerWidth;
  const D = Math.sqrt(H ** 2 + W ** 2);

  document.documentElement.style.fontSize = (D * 0.01) + 'px';
}

window.addEventListener('resize', calcDiagonalViewport);
window.addEventListener('load', calcDiagonalViewport);



function updateCard(index) {
  const carousel = document.getElementById('carousel');
  const offset = -index * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}

fetch('cards.json')
  .then(res => res.json())
  .then(data => {
    let cardJson = data;
    let i = 0;
    let j = 0;

    for(i; i < cardJson.length; i++) {
      const card = document.createElement('section')
      card.className = `card ${i}`;
      card.innerHTML = `
        <div class="top">
            <h2>Conheça nossas delícias</h2>
            <a class="link" href="contato.html">Ficou com fome?</a>
        </div>
        <article>
            <img src="${cardJson[i].img.src}" alt="${cardJson[i].img.alt}">
            <h3>${cardJson[i].h3}</h3>
            <p>${cardJson[i].p}</p>
        </article>
      `;

      document.getElementById('carousel').appendChild(card);
    }
    updateCard(0);

    document.getElementById('prev').onclick = () => {
      j = (j - 1 + i) % i;
      updateCard(j);
    };

    document.getElementById('next').onclick = () => {
      j = (j + 1) % i;
      updateCard(j);
    };
  })

