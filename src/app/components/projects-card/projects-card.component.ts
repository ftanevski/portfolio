import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-projects-card',
    templateUrl: './projects-card.component.html',
    styleUrls: ['./projects-card.component.scss']
})
export class ProjectsCardComponent implements OnInit {
    projects = [
        {   src: '/portfolio/assets/images/logos/ebec.png', 
            title: 'EBEC', 
            description: `European BEST Engineering Competition, or EBEC for short is a competition intended to encourage creative
                         thinking, and solve complex problems. The competition takes place in three rounds, them being Local, 
                         Regional, and Final round. Teams of four students can apply to compete in two categories which are
                         Innovative Design and Case Study.`,
            link: 'https://ebec.best.org.mk'
        },
        {
            src: '/portfolio/assets/images/logos/jobfair.png',
            title: 'JobFair',
            description: '',
            link: 'https://vjobfair.org.mk'
        }
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
