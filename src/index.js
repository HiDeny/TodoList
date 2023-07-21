import 'normalize.css';
import '../src/style.css';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import generalController from './components/mainScreen/controller/controlMainPage';
import mainPage from './components/mainScreen/interface/displayMainPage';

mainPage();
generalController();
