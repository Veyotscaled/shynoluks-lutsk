'use strict';
const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobile-menu');
menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!expanded));menuToggle.setAttribute('aria-label',expanded?'Відкрити меню':'Закрити меню');mobileMenu.hidden=expanded;});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Відкрити меню');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Відкрити меню');menuToggle.focus();}});
const services={
  "tires": {
    "title": "Шиномонтаж",
    "description": "Заміна сезонного комплекту, монтаж і демонтаж шин для легкових авто, кросоверів та бусів.",
    "items": [
      "Зняття та встановлення коліс",
      "Монтаж і демонтаж шин",
      "Балансування за прайсом для категорії авто"
    ],
    "price": "Повний комплекс за одне колесо: легкові від 175 грн / кросовери від 225 грн / буси 225 грн. Обери категорію та діаметр у прайсі."
  },
  "balance": {
    "title": "Балансування коліс",
    "description": "Вібрація керма на швидкості — привід перевірити колеса. Балансування є в прайсі для всіх трьох категорій автомобілів.",
    "items": [
      "Балансування після заміни шин",
      "Послуга для легкових, кросоверів та бусів",
      "Вартість залежить від діаметра й категорії авто"
    ],
    "price": "Балансування за прайсом — від 70 грн за колесо. Зняття, монтаж та інші роботи рахуються окремо або у складі комплексу."
  },
  "repair": {
    "title": "Ремонт пошкоджених шин",
    "description": "Спосіб ремонту залежить від місця та характеру пошкодження. Спочатку потрібно оглянути шину.",
    "items": [
      "Огляд пошкодження шини",
      "Ремонт універсальним пластиром Tip-Top",
      "Обговорення можливості ремонту"
    ],
    "price": "Ремонт універсальним пластиром Tip-Top — від 150 грн. Остаточну вартість і можливість ремонту уточни після огляду."
  },
  "pressure": {
    "title": "Перевірка та коригування тиску",
    "description": "Тиск у шинах перевіряють і доводять до норми для твого автомобіля. Це одна з послуг, зазначених на сайті ШиноЛюкс.",
    "items": [
      "Перевірка тиску в шинах",
      "Коригування до потрібного значення",
      "Обговорення перевірки перед поїздкою"
    ],
    "price": "Окрема ціна на цю послугу на сайті не вказана. Уточни її телефоном або під час візиту."
  },
  "sale": {
    "title": "Продаж нових шин",
    "description": "На сайті ШиноЛюкс вказані шини в наявності та можливість купівлі під замовлення. Уточни потрібний розмір і сезон.",
    "items": [
      "Нові шини в наявності",
      "Можливість замовити потрібний комплект",
      "Продаж також у павільйоні 32 на Завокзальному ринку"
    ],
    "price": "Наявність і ціну комплекту уточни телефоном. При купівлі нових шин монтаж безкоштовний / балансування та інші роботи обговори окремо."
  },
  "storage": {
    "title": "Сезонне зберігання шин",
    "description": "Зберігання комплекту між сезонами: чотири шини на шість місяців. Можна передати їх з дисками або без.",
    "items": [
      "Комплект із чотирьох шин",
      "Термін зберігання шість місяців",
      "Шини з дисками або без дисків"
    ],
    "price": "За прайсом: 500 грн за чотири шини без дисків / 600 грн із дисками на шість місяців. Узгодь наявність місця та передачу комплекту."
  }
};
const dialog=document.querySelector('.service-dialog');
let lastServiceButton=null;
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{const service=services[button.dataset.service];lastServiceButton=button;document.querySelector('#dialog-title').textContent=service.title;document.querySelector('#dialog-description').textContent=service.description;document.querySelector('.dialog-price p').textContent=service.price;const list=document.querySelector('#dialog-list');list.replaceChildren(...service.items.map(text=>{const item=document.createElement('li');item.textContent=text;return item;}));dialog.showModal();document.body.classList.add('dialog-open');}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');lastServiceButton?.focus();});
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
if('IntersectionObserver' in window&&!reducedMotion.matches){
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.brand-strip>span,.section-top,.section-heading,.service-card,.restoration-content>*:not(.tags),.process-layout h2,.process-step,.faq-layout>div,.contact-copy,.contact-card,.price-tabs,.price-grid,.price-extras,.branch-card,.market-point').forEach(element=>{
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
  document.querySelectorAll('.service-card').forEach((card,index)=>{
    card.style.setProperty('--reveal-delay',(index%3)*.06+'s');
  });
  document.querySelectorAll('.process-step').forEach((step,index)=>{
    step.style.setProperty('--reveal-delay',index*.06+'s');
  });
}

const priceCategories={
  "passenger": [
    {
      "size": "R13–14",
      "total": 175,
      "remove": 50,
      "mount": 55,
      "balance": 70
    },
    {
      "size": "R15–16",
      "total": 200,
      "remove": 60,
      "mount": 60,
      "balance": 80
    },
    {
      "size": "R17–18",
      "total": 225,
      "remove": 70,
      "mount": 70,
      "balance": 85
    },
    {
      "size": "R19–22",
      "total": 250,
      "remove": 80,
      "mount": 75,
      "balance": 95
    }
  ],
  "crossover": [
    {
      "size": "R15–16",
      "total": 225,
      "remove": 70,
      "mount": 70,
      "balance": 85
    },
    {
      "size": "R17–18",
      "total": 250,
      "remove": 80,
      "mount": 75,
      "balance": 95
    },
    {
      "size": "R19–23",
      "total": 300,
      "remove": 100,
      "mount": 90,
      "balance": 110
    }
  ],
  "van": [
    {
      "size": "R14C–17C",
      "total": 225,
      "remove": 70,
      "mount": 70,
      "balance": 85
    }
  ]
};
const priceTabs=[...document.querySelectorAll('[data-price-category]')];
const pricePanel=document.querySelector('#price-panel');
function createPriceCard(item){
  const card=document.createElement('article');
  card.className='price-card clipped';
  const size=document.createElement('span');
  size.className='price-size';
  size.textContent=item.size;
  const total=document.createElement('div');
  total.className='price-total';
  const number=document.createElement('strong');
  number.textContent=item.total;
  const unit=document.createElement('span');
  unit.textContent='грн / колесо';
  total.append(number,unit);
  const list=document.createElement('dl');
  [['Зняття / встановлення','remove'],['Шиномонтаж','mount'],['Балансування','balance']].forEach(([label,key])=>{
    const row=document.createElement('div');
    const term=document.createElement('dt');
    const value=document.createElement('dd');
    term.textContent=label;
    value.textContent=item[key]+' грн';
    row.append(term,value);
    list.append(row);
  });
  card.append(size,total,list);
  return card;
}
function selectPriceCategory(tab){
  priceTabs.forEach(button=>{
    const selected=button===tab;
    button.setAttribute('aria-selected',String(selected));
    button.tabIndex=selected?0:-1;
  });
  pricePanel.setAttribute('aria-labelledby',tab.id);
  pricePanel.replaceChildren(...priceCategories[tab.dataset.priceCategory].map(createPriceCard));
  if(!reducedMotion.matches&&typeof pricePanel.animate==='function'){
    pricePanel.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'cubic-bezier(0.215,0.61,0.355,1)'});
  }
}
priceTabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectPriceCategory(tab));
  tab.addEventListener('keydown',event=>{
    const keys=['ArrowRight','ArrowLeft','Home','End'];
    if(!keys.includes(event.key))return;
    event.preventDefault();
    const nextIndex=event.key==='Home'?0:event.key==='End'?priceTabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+priceTabs.length)%priceTabs.length;
    const nextTab=priceTabs[nextIndex];
    selectPriceCategory(nextTab);
    nextTab.focus();
  });
});
