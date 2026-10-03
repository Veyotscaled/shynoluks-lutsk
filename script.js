'use strict';
const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobile-menu');
menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!expanded));menuToggle.setAttribute('aria-label',expanded?'Відкрити меню':'Закрити меню');mobileMenu.hidden=expanded;});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Відкрити меню');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Відкрити меню');menuToggle.focus();}});
const services={
  tires:{title:'Шиномонтаж та балансування',description:'Заміна шин до сезону та обслуговування коліс легкових автомобілів, мікроавтобусів і мототехніки.',items:['Монтаж і демонтаж шин','Комп’ютерне балансування коліс','Ремонт пошкоджених шин']},
  repair:{title:'Ремонт дисків і шин',description:'Можливість відновлення визначається після огляду. Надішли фото пошкодження, щоб почати розмову з майстром.',items:['Рихтування сталевих та легкосплавних дисків','Робота з автомобільними та мото дисками','Аргонне зварювання та ремонт шин']},
  paint:{title:'Порошкове фарбування',description:'Відновлення покриття автомобільних та мото дисків. Приклади кольорів і готових робіт дивись у нашому Instagram.',items:['Піскоструминна обробка','Підготовка поверхні диска','Порошкове фарбування']},
  diamond:{title:'Діамантова проточка',description:'Обробка лицьової поверхні легкосплавного диска для відновлення малюнка та металевого блиску. Можливість проточки залежить від стану диска.',items:['Оцінка стану поверхні','Механічна обробка лицьової частини','Обговорення сумісності з іншими роботами']},
  sale:{title:'Продаж дисків',description:'Актуальні комплекти дивись у розділі «Продаж дисків» нашого Instagram. Наявність і вартість уточни перед візитом.',items:['Уточни діаметр, ширину та виліт','Перевір кріплення та сумісність із авто','Домовся про огляд комплекту']},
  storage:{title:'Сезонне зберігання',description:'Зберігання комплекту шин між сезонами. Уточни наявність місця та умови, перш ніж привозити колеса.',items:['Узгодь термін зберігання','Уточни вартість для свого комплекту','Домовся про передачу та отримання']}
};
const dialog=document.querySelector('.service-dialog');
let lastServiceButton=null;
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{const service=services[button.dataset.service];lastServiceButton=button;document.querySelector('#dialog-title').textContent=service.title;document.querySelector('#dialog-description').textContent=service.description;const list=document.querySelector('#dialog-list');list.replaceChildren(...service.items.map(text=>{const item=document.createElement('li');item.textContent=text;return item;}));dialog.showModal();document.body.classList.add('dialog-open');}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');lastServiceButton?.focus();});
document.querySelector('#year').textContent=new Date().getFullYear();
