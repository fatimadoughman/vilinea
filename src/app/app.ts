import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Home } from './home/home';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar,Home],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('velinea');
}
