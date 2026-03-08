import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavigation } from '../side-navigation/side-navigation';

@Component({
    selector: 'app-main-content',
    imports: [RouterOutlet, SideNavigation],
    templateUrl: './main-content.html',
    styleUrl: './main-content.css',
})
export class MainContent {}
