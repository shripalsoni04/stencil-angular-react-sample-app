import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stencil Web Components Usage App';

  firstName = 'Shripal';

  lastName = 'Soni';

  showHelloWorld = false;
}
