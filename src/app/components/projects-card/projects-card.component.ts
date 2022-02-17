import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-projects-card',
    templateUrl: './projects-card.component.html',
    styleUrls: ['./projects-card.component.scss']
})
export class ProjectsCardComponent implements OnInit {
    ebec = {
        src: '../../../assets/images/logos/ebec.png',
        title: 'EBEC',
        description: 'EBEC (European BEST Engineering Competition) is an engineering competition organized by BEST Skopje. The technology stack we used here is HTML, CSS, JavaScript and Bootstrap',
        link: 'https://ebec.best.org.mk'
    }

    constructor() { }

    ngOnInit(): void {
    }

}
