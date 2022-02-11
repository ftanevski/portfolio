import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Particles from './assets/js/particles.js'

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));

window.onload = function () {
    Particles.init({
        selector: '.background',
        color: '#4D99D9',
        connectParticles: true,
        maxParticles: 200
    });
};