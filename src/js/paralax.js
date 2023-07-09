const { default: axios } = require('axios');

window.addEventListener('load', onLoad);

function onLoad(e) {
  const paralax = document.querySelector('.paralax');
  const content = document.querySelector('.content');

  const pixabayAPI = async () => {
    const req = await axios.get(
      'https:pixabay.com/api/?key=37133631-8f51e9c6f744fc90bf0fea549&q=yellow+flowers&image_type=photo'
    );

    const data = await req.data;

    return data.hits;
  };

  async function draw() {
    const data = await pixabayAPI();
    const markup = data.map(item => `<img src="${item.previewURL}"/>`);
    content.insertAdjacentHTML('beforeend', markup);
  }
  draw();

  if (paralax) {
    const star = document.querySelector('.paralax-star');
    const starText = document.querySelector('.text-content');

    const speedForStars = 140;
    const speedForText = 120;
    const scrollY = 6;

    paralax.addEventListener('mousemove', e => {
      const paralaxX = paralax.offsetWidth;
      const paralaxY = paralax.offsetHeight;

      const mouseX = e.pageX - paralaxX / 2;
      const mouseY = e.pageY - paralaxY / 2;

      star.style.cssText = `transform: translate(${mouseX / speedForStars}%,${
        mouseY / speedForStars
      }% )`;
      starText.style.cssText = `transform: translate(${
        mouseX / speedForText
      }%,${mouseY / speedForText}% )`;
    });

    content.addEventListener('mousemove', e => {
      const paralaxX = paralax.offsetWidth;
      const paralaxY = paralax.offsetHeight;

      const mouseX = e.pageX - paralaxX / 2;
      const mouseY = e.pageY - paralaxY / 2;

      star.style.cssText = `transform: translate(${mouseX / speedForStars}%,${
        mouseY / speedForStars
      }% )`;
      starText.style.cssText = `transform: translate(${
        mouseX / speedForText
      }%,${mouseY / speedForText}% )`;
    });

    // window.addEventListener('scroll', e => {
    //   const windowY = window.scrollY;

    //   starText.style.cssText = `transform: translateY(${-windowY / scrollY}%)`;
    // });
  }
}