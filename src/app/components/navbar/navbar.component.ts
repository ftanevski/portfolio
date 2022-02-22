import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      let navbar = document.querySelector('.navbar') as HTMLElement;
      let topOfNav = navbar.offsetTop;
      let sliderSwitch = document.querySelector('.checkbox') as HTMLElement;

      function fixNav() {
          if (window.scrollY >= topOfNav) {
              navbar.classList.add('fixed-top');
          } else {
              navbar.classList.remove('fixed-top');
          }
        }
      
        function changeTheme() {
            let body = document.querySelector('body');
            let card = document.querySelector('.card');
            if (body.className === "dark-theme") {
                body.className = "light-theme";
                navbar.classList.remove('nav-dark');
                navbar.classList.add('nav-light');
                card.classList.remove('bg-dark');
                card.classList.remove('text-light');
                card.classList.add('bg-light');
                card.classList.add('text-dark');
            } else {
                body.className = "dark-theme";
                navbar.classList.remove('nav-light');
                navbar.classList.add('nav-dark');
                card.classList.remove('bg-light');
                card.classList.remove('text-dark');
                card.classList.add('bg-dark');
                card.classList.add('text-light');
            }
        }

        window.addEventListener('scroll', fixNav);
        sliderSwitch.addEventListener('change', changeTheme);
  }

  
}
