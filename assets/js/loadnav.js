const burger = document.getElementById('burger');
const menuIcon = document.getElementById('open-menu')
const mobileMenu = document.getElementById('mobilenav');
const options = document.querySelectorAll('#menu-option-mobile')
const navactions = document.querySelectorAll('.nav-actions nav a')
const navactionsMobile = document.querySelectorAll('.nav-actions-mobile a')


document.addEventListener('DOMContentLoaded', ()=> {
    if (burger && mobileMenu && menuIcon) {
        burger.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                menuIcon.src = '/assets/img/menu.svg';
            } else {
                menuIcon.src = '/assets/img/close.svg';
            }
                mobileMenu.classList.toggle('active');
        });

        options.forEach((option)=> {
            option.addEventListener('click', ()=>{
                mobileMenu.classList.remove('active');
                menuIcon.src = '/assets/img/menu.svg'
            })
        })

        if (window.location.pathname === '/') {
            navactions[0].addEventListener('click', showLoginBox);
            navactions[1].addEventListener('click', showRegisterBox);
            navactionsMobile[0].addEventListener('click', 
                ()=> {
                    showLoginBox();
                    mobileMenu.classList.remove('active')
                    menuIcon.src = '/assets/img/menu.svg'
                });
            navactionsMobile[1].addEventListener('click',
                ()=> {
                    showRegisterBox();
                    mobileMenu.classList.remove('active')
                    menuIcon.src = '/assets/img/menu.svg'
                });
            }
        else {
            navactions[0].addEventListener('click', ()=> {window.location.href = '/#auth'});
            navactions[1].addEventListener('click', ()=> {window.location.href = '/#auth'});
            navactionsMobile[0].addEventListener('click', ()=> {
                window.location.href = '/#auth'
                mobileMenu.classList.remove('active')
                menuIcon.src = '/assets/img/menu.svg'
            });
            navactionsMobile[1].addEventListener('click', ()=> {
                window.location.href = '/#auth'
                mobileMenu.classList.remove('active')
                menuIcon.src = '/assets/img/menu.svg'
            });
        }
    }  
})