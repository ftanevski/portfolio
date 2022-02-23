import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/models/Project';

@Component({
    selector: 'app-projects-card',
    templateUrl: './projects-card.component.html',
    styleUrls: ['./projects-card.component.scss']
})
export class ProjectsCardComponent implements OnInit {
    @Input() project: Project;

    constructor() { }

    ngOnInit(): void {
    }

}
