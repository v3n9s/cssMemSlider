class SliderControl{
  currentSlideInd = 0;
  constructor({imageContainer, image, textContainer, text, slides, controls}){
    this.imageContainer = imageContainer;
    this.image = image;
    this.textContainer = textContainer;
    this.text = text;
    this.slides = slides;
    controls.forEach((elem, ind) => elem.addEventListener('change', this.goToSlide.bind(this, ind)));
  }
  goToSlide(ind){
    this.text.style.animation = 'hideText 0.25s linear both';
    let tempImg = document.createElement('img');
    const animationName = (ind - this.currentSlideInd > 0) ? 'slideFromRight' : 'slideFromLeft';
    tempImg.className = 'slider__image';
    tempImg.src = slides[ind].imageUrl;
    tempImg.style.position = 'absolute';
    tempImg.style.animation = `${animationName} 0.5s ease`;
    this.imageContainer.append(tempImg);
    this.image.style.animation = 'hideImage 0.5s ease';
    tempImg.addEventListener('animationend', () => {
      this.image.src = tempImg.src;
      this.image.style.animation = '';
      tempImg.remove();
    })

    this.text.addEventListener('animationend', () => {
      this.text.innerText = slides[ind].text;
      this.text.style.animation = 'showText 0.25s linear both';
    }, {once: true});

    this.currentSlideInd = ind;
  }
}

let slides = [
  {
    imageUrl: './assets/img/hackerman.png',
    text: 'HACKERMAN'
  },
  {
    imageUrl: 'https://i.kym-cdn.com/entries/icons/original/000/013/034/maxresdefault.jpg',
    text: 'YEAH SCIENCE!'
  },
  {
    imageUrl: 'https://i.kym-cdn.com/entries/icons/original/000/028/367/cover1.jpg',
    text: 'Me and the Boys'
  },
  {
    imageUrl: 'https://i.kym-cdn.com/entries/icons/original/000/031/015/cover5.jpg',
    text: 'Yes'
  },
  {
    imageUrl: 'https://scontent.fmsq3-1.fna.fbcdn.net/v/t1.6435-9/64867203_2367646543454500_3515278677048819712_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=9267fe&_nc_ohc=FrLhIjv9LwEAX8fK7JH&_nc_ht=scontent.fmsq3-1.fna&oh=2f937a9fd19b55ebdbf34bef4b3fab22&oe=61924A6E',
    text: 'Сегодня на концерте в Белоруссии, на красной площади скончался великий бразильский писатель и дальнобойщик -Барак Обама... Вечная Память этомубоксёру ...'
  },
  {
    imageUrl: 'https://scontent.fmsq3-1.fna.fbcdn.net/v/t1.6435-9/236167010_4653601261319645_2955273413584812066_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=bFz4dlITwnMAX_IurYw&_nc_ht=scontent.fmsq3-1.fna&oh=6027144c2143fc9df05a0d1fb1a1885a&oe=618FC334',
    text: 'Fan of Metallica, Vocalist of Metallica'
  }
]

function addControls(){
  let controls = `<label class="slider-controls__box" for="slide-bullet-0">
<input class="slider-controls__radio" id="slide-bullet-0" type="radio" name="slide-bullet" checked>
<div class="slider-controls__customized-radio"></div>
</label>`;
  for(let i = 1;i < slides.length; i++){
    controls += `<label class="slider-controls__box" for="slide-bullet-${i}">
<input class="slider-controls__radio" id="slide-bullet-${i}" type="radio" name="slide-bullet">
<div class="slider-controls__customized-radio"></div>
</label>`;
  }
  document.querySelector('.slider__controls-container').innerHTML = controls;

let sliderControl = new SliderControl({
  imageContainer: document.querySelector('.slider__image-container'),
  image: document.querySelector('.slider__image'),
  textContainer: document.querySelector('.slider__text-container'),
  text: document.querySelector('.slider__text'),
  slides: slides,
  controls: document.querySelectorAll('.slider-controls__box')
})
}

addControls();