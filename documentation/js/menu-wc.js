'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">edu documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-e7df764dd5e4cb82512eec4343d6e26df59610ff7d220f91747c922cf43b4936a7996db02b4fd304e36d187bf0360326d2a66f1ab73d0c92ef1b16df4bdbbccc"' : 'data-target="#xs-controllers-links-module-AppModule-e7df764dd5e4cb82512eec4343d6e26df59610ff7d220f91747c922cf43b4936a7996db02b4fd304e36d187bf0360326d2a66f1ab73d0c92ef1b16df4bdbbccc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e7df764dd5e4cb82512eec4343d6e26df59610ff7d220f91747c922cf43b4936a7996db02b4fd304e36d187bf0360326d2a66f1ab73d0c92ef1b16df4bdbbccc"' :
                                            'id="xs-controllers-links-module-AppModule-e7df764dd5e4cb82512eec4343d6e26df59610ff7d220f91747c922cf43b4936a7996db02b4fd304e36d187bf0360326d2a66f1ab73d0c92ef1b16df4bdbbccc"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-e7df764dd5e4cb82512eec4343d6e26df59610ff7d220f91747c922cf43b4936a7996db02b4fd304e36d187bf0360326d2a66f1ab73d0c92ef1b16df4bdbbccc"' : 'data-target="#xs-injectables-links-module-AppModule-e7df764dd5e4cb82512eec4343d6e26df59610ff7d220f91747c922cf43b4936a7996db02b4fd304e36d187bf0360326d2a66f1ab73d0c92ef1b16df4bdbbccc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e7df764dd5e4cb82512eec4343d6e26df59610ff7d220f91747c922cf43b4936a7996db02b4fd304e36d187bf0360326d2a66f1ab73d0c92ef1b16df4bdbbccc"' :
                                        'id="xs-injectables-links-module-AppModule-e7df764dd5e4cb82512eec4343d6e26df59610ff7d220f91747c922cf43b4936a7996db02b4fd304e36d187bf0360326d2a66f1ab73d0c92ef1b16df4bdbbccc"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-fe7e4a64cffc435467b2f47ad0b3a104c4af8e28ef21ae6f12658d18052630bc1e4b245191859e95e882736a8c2bdc19495adb006797ccb14b2434f28f5b0b15"' : 'data-target="#xs-controllers-links-module-UsersModule-fe7e4a64cffc435467b2f47ad0b3a104c4af8e28ef21ae6f12658d18052630bc1e4b245191859e95e882736a8c2bdc19495adb006797ccb14b2434f28f5b0b15"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-fe7e4a64cffc435467b2f47ad0b3a104c4af8e28ef21ae6f12658d18052630bc1e4b245191859e95e882736a8c2bdc19495adb006797ccb14b2434f28f5b0b15"' :
                                            'id="xs-controllers-links-module-UsersModule-fe7e4a64cffc435467b2f47ad0b3a104c4af8e28ef21ae6f12658d18052630bc1e4b245191859e95e882736a8c2bdc19495adb006797ccb14b2434f28f5b0b15"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-fe7e4a64cffc435467b2f47ad0b3a104c4af8e28ef21ae6f12658d18052630bc1e4b245191859e95e882736a8c2bdc19495adb006797ccb14b2434f28f5b0b15"' : 'data-target="#xs-injectables-links-module-UsersModule-fe7e4a64cffc435467b2f47ad0b3a104c4af8e28ef21ae6f12658d18052630bc1e4b245191859e95e882736a8c2bdc19495adb006797ccb14b2434f28f5b0b15"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-fe7e4a64cffc435467b2f47ad0b3a104c4af8e28ef21ae6f12658d18052630bc1e4b245191859e95e882736a8c2bdc19495adb006797ccb14b2434f28f5b0b15"' :
                                        'id="xs-injectables-links-module-UsersModule-fe7e4a64cffc435467b2f47ad0b3a104c4af8e28ef21ae6f12658d18052630bc1e4b245191859e95e882736a8c2bdc19495adb006797ccb14b2434f28f5b0b15"' }>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WeatherModule.html" data-type="entity-link" >WeatherModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-WeatherModule-8f388529768fa18651bc2ccc7a949e1f8049108456ae22d9bfbd1628a46724bd973da728032e8727b81d608c75329c76432e836caba20b3e3f055f76441129f8"' : 'data-target="#xs-controllers-links-module-WeatherModule-8f388529768fa18651bc2ccc7a949e1f8049108456ae22d9bfbd1628a46724bd973da728032e8727b81d608c75329c76432e836caba20b3e3f055f76441129f8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WeatherModule-8f388529768fa18651bc2ccc7a949e1f8049108456ae22d9bfbd1628a46724bd973da728032e8727b81d608c75329c76432e836caba20b3e3f055f76441129f8"' :
                                            'id="xs-controllers-links-module-WeatherModule-8f388529768fa18651bc2ccc7a949e1f8049108456ae22d9bfbd1628a46724bd973da728032e8727b81d608c75329c76432e836caba20b3e3f055f76441129f8"' }>
                                            <li class="link">
                                                <a href="controllers/WeatherController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WeatherController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WeatherModule-8f388529768fa18651bc2ccc7a949e1f8049108456ae22d9bfbd1628a46724bd973da728032e8727b81d608c75329c76432e836caba20b3e3f055f76441129f8"' : 'data-target="#xs-injectables-links-module-WeatherModule-8f388529768fa18651bc2ccc7a949e1f8049108456ae22d9bfbd1628a46724bd973da728032e8727b81d608c75329c76432e836caba20b3e3f055f76441129f8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WeatherModule-8f388529768fa18651bc2ccc7a949e1f8049108456ae22d9bfbd1628a46724bd973da728032e8727b81d608c75329c76432e836caba20b3e3f055f76441129f8"' :
                                        'id="xs-injectables-links-module-WeatherModule-8f388529768fa18651bc2ccc7a949e1f8049108456ae22d9bfbd1628a46724bd973da728032e8727b81d608c75329c76432e836caba20b3e3f055f76441129f8"' }>
                                        <li class="link">
                                            <a href="injectables/WeatherService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WeatherService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/UserDataDto.html" data-type="entity-link" >UserDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Users.html" data-type="entity-link" >Users</a>
                            </li>
                            <li class="link">
                                <a href="classes/Weather.html" data-type="entity-link" >Weather</a>
                            </li>
                            <li class="link">
                                <a href="classes/WeatherDto.html" data-type="entity-link" >WeatherDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/IsActiveMiddleware.html" data-type="entity-link" >IsActiveMiddleware</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});