
import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  isMenuOpen = signal(false);
  scrollProgress = signal(0);
  isScrolled = signal(false);

  navLinks = [
    { label: 'Shop',      path: '/shop'     },
    { label: 'Occasions', path: '/occasions' },
    { label: 'About',     path: '/about'    },
  ];

  @HostListener('window:scroll')
  onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(Math.round((scrollTop / docHeight) * 100));
    this.isScrolled.set(scrollTop > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
}