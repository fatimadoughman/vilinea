
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [CommonModule, RouterLink]
})

export class Home {



  @ViewChild('cursorDot') cursorDot!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorRing') cursorRing!: ElementRef<HTMLDivElement>;

  isScrolled = false;
  testimonialIndex = 0;

  private timer?: number;
  private animationId?: number;
  private observer?: IntersectionObserver;

  private mx = 0;
  private my = 0;
  private rx = 0;
  private ry = 0;

  marqueeItems = [
    'Celebration Cakes',
    'Floral Gifts',
    'Gift Boxes',
    'Custom Orders',
    'Flower Cakes',
    'Wedding Tiers',
    'Birthday Specials',
    'Corporate Gifting',
    'Celebration Cakes',
    'Floral Gifts',
    'Gift Boxes',
    'Custom Orders'
  ];

  cards = [
    {
      title: 'Celebration Cakes',
      sub: 'For every milestone',
      tag: 'Bestseller',
      image: 'vil.jpeg'
    },
    {
      title: 'Floral Gifts',
      sub: 'Blooms & sweetness',
      tag: 'New',
      image: 'vil.jpeg'
    },
    {
      title: 'Gift Boxes',
      sub: 'Curated with love',
      tag: 'Popular',
      image: 'vil.jpeg'
    }
  ];

  features = [
    {
      icon: '✦',
      title: 'Artisan Crafted',
      desc: 'Each piece is hand-designed with beautiful detail and love.'
    },
    {
      icon: '🌿',
      title: 'Finest Ingredients',
      desc: 'Premium ingredients for beautiful and delicious creations.'
    },
    {
      icon: '🎁',
      title: 'Custom Orders',
      desc: 'Tell us your vision and we will bring it to life.'
    },
    {
      icon: '◎',
      title: 'Fresh Daily',
      desc: 'Every order is prepared fresh for your special moment.'
    }
  ];

  testimonials = [
    {
      name: 'Amelia R.',
      role: 'Bride',
      init: 'A',
      quote: 'Velinea made our wedding cake absolutely breathtaking.'
    },
    {
      name: 'Sofia K.',
      role: 'Regular Customer',
      init: 'S',
      quote: 'Every single creation has been flawless and elegant.'
    },
    {
      name: 'James L.',
      role: 'Corporate Client',
      init: 'J',
      quote: 'The presentation is always beautiful and professional.'
    }
  ];
petalPaths = [
  "M10,0 C14,3 14,7 10,10 C6,13 2,11 0,7 C-2,3 2,0 10,0Z",
  "M8,0 C12,2 13,8 8,11 C3,14 -1,9 1,4 C3,0 6,-1 8,0Z",
  "M6,0 C11,0 14,5 11,9 C8,13 2,13 0,8 C-2,4 2,0 6,0Z"
];
petals = Array.from({ length: 18 }, (_, i) => {
  const left     = Math.random() * 100;
  // const delay    = +(Math.random() * 12).toFixed(2);
  const duration = +(8 + Math.random() * 10).toFixed(2);
  const size     = Math.floor(8 + Math.random() * 12);
  

const delay = Math.random() * 10;
const negativeDelay = -Math.random() * duration;

return {
  id: i,
  path: this.petalPaths[i % this.petalPaths.length],
  size,
  svgAnimation: `petalSway ${duration}s ${negativeDelay}s ease-in-out infinite alternate`,
  style: {
    left: `${left}%`,
    '--petal-dur': `${duration}s`,
    '--petal-delay': `${negativeDelay}s`
  }
};

});







  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 30;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mx = event.clientX;
    this.my = event.clientY;
  }

  ngAfterViewInit(): void {
    this.startCursor();
    this.startRevealObserver();
    this.startTestimonials();
  }

  ngOnDestroy(): void {
    if (this.timer) window.clearInterval(this.timer);
    if (this.animationId) window.cancelAnimationFrame(this.animationId);
    this.observer?.disconnect();
  }

  startCursor(): void {
    const animate = () => {
      this.rx += (this.mx - this.rx) * 0.12;
      this.ry += (this.my - this.ry) * 0.12;

      if (this.cursorDot && this.cursorRing) {
        this.cursorDot.nativeElement.style.left = `${this.mx}px`;
        this.cursorDot.nativeElement.style.top = `${this.my}px`;

        this.cursorRing.nativeElement.style.left = `${this.rx}px`;
        this.cursorRing.nativeElement.style.top = `${this.ry}px`;
      }

      this.animationId = window.requestAnimationFrame(animate);
    };

    animate();
  }

  startRevealObserver(): void {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach(el => {
      this.observer?.observe(el);
    });
  }

  startTestimonials(): void {
    this.timer = window.setInterval(() => {
      this.nextTestimonial(false);
    }, 5000);
  }

  resetTimer(): void {
    if (this.timer) window.clearInterval(this.timer);
    this.startTestimonials();
  }

  nextTestimonial(reset = true): void {
    this.testimonialIndex =
      (this.testimonialIndex + 1) % this.testimonials.length;

    if (reset) this.resetTimer();
  }

  prevTestimonial(): void {
    this.testimonialIndex =
      (this.testimonialIndex - 1 + this.testimonials.length) %
      this.testimonials.length;

    this.resetTimer();
  }

  goTestimonial(index: number): void {
    this.testimonialIndex = index;
    this.resetTimer();
  }
}