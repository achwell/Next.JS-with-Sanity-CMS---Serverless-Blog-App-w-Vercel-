import { library, config } from '@fortawesome/fontawesome-svg-core';
import {
  faBorderAll,
  faList,
  faSortNumericDown,
  faSortNumericUp } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
library.add(faList, faBorderAll, faSortNumericDown, faSortNumericUp);
import '@fortawesome/fontawesome-svg-core/styles.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'highlight.js/scss/devibeans.scss';
import 'styles/index.scss'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
