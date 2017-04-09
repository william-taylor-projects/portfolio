
import contactCtrl from './controller-contact.js';
import uniCtrl from './controller-uni.js';
import appCtrl from './controller-app.js';

export default app => {
  [contactCtrl, uniCtrl, appCtrl].forEach(bootstrap => {
    bootstrap(app);
  });
}
