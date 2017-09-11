import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.title = data.state.root.firstChild.data.title;
      }
    });
  }
}
