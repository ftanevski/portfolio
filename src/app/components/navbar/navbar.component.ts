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

      function fixNav() {
          if (window.scrollY >= topOfNav) {
              navbar.classList.add('fixed-top');
          } else {
              navbar.classList.remove('fixed-top');
          }
        }
      
      window.addEventListener('scroll', fixNav);
  }

}
