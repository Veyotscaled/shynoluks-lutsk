'use strict';
const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobile-menu');
menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!expanded));menuToggle.setAttribute('aria-label',expanded?'Відкрити меню':'Закрити меню');mobileMenu.hidden=expanded;});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Відкрити меню');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Відкрити меню');menuToggle.focus();}});
const services={
  tires:{title:'Шиномонтаж',description:'Заміна сезонного комплекту або встановлення нових шин. Уточни вартість для свого автомобіля перед візитом.',items:['Монтаж і демонтаж шин','Сезонна заміна комплекту','Обговорення потрібних робіт із майстром']},
  balance:{title:'Балансування коліс',description:'Вібрація на швидкості може бути пов’язана з колесами. Після заміни шин або ремонту варто обговорити балансування.',items:['Балансування коліс','Перевірка після заміни шин','Уточнення причин вібрації']},
  repair:{title:'Ремонт шин та вулканізація',description:'Спосіб ремонту залежить від місця, розміру та характеру пошкодження. Не кожну пошкоджену шину можна ремонтувати.',items:['Огляд пошкодження','Ремонт проколів','Вулканізація після оцінки стану']},
  straighten:{title:'Рихтування дисків',description:'Відновлення геометрії пошкодженого диска, якщо його стан дозволяє ремонт. Надішли фото або домовся про огляд.',items:['Оцінка деформації','Рихтування диска','Обговорення доцільності відновлення']},
  welding:{title:'Аргонне зварювання',description:'Робота з тріщинами та іншими пошкодженнями дисків. Можливість зварювання визначається після огляду.',items:['Огляд тріщини та стану диска','Аргонне зварювання','Уточнення обсягу ремонту']},
  paint:{title:'Порошкове фарбування дисків',description:'Оновлення покриття дисків. У профілі Vinshyna є приклади фарбування та готових робіт.',items:['Обговорення стану покриття','Вибір кольору','Порошкове фарбування дисків']}
};
const dialog=document.querySelector('.service-dialog');
let lastServiceButton=null;
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{const service=services[button.dataset.service];lastServiceButton=button;document.querySelector('#dialog-title').textContent=service.title;document.querySelector('#dialog-description').textContent=service.description;const list=document.querySelector('#dialog-list');list.replaceChildren(...service.items.map(text=>{const item=document.createElement('li');item.textContent=text;return item;}));dialog.showModal();document.body.classList.add('dialog-open');}));
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
  document.querySelectorAll('.brand-strip>span,.section-top,.section-heading,.service-card,.restoration-content>*:not(.tags),.process-layout h2,.process-step,.faq-layout>div,.contact-copy,.contact-card').forEach(element=>{
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
