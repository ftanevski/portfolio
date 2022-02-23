import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})


export class ProjectsComponent implements OnInit {
    projects: Project[] = [
        {
            src: '../../../assets/images/logos/jobfair.png',
            title: 'JobFair',
            description: `JobFair is a virtual career fair with the help of which students seeking for internships/jobs can
                             can leave their CV on the website and get to know the companies attending the fair, and all of the
                             opportunities that they can offer.`,
            link: 'https://vjobfair.org.mk'
        },
        {
            src: '../../../assets/images/logos/ebec.png',
            title: 'EBEC',
            description: `European BEST Engineering Competition, or EBEC for short is a competition intended to encourage
                             creative thinking, and solve complex problems. The competition takes place in three rounds, them 
                             being Local, Regional, and Final round. Teams of four students can apply to compete in two categories 
                             which are Innovative Design and Case Study.`,
            link: 'https://ebec.best.org.mk'
        },
    ];

    constructor() { }

    ngOnInit(): void {

    }
}
