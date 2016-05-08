import _module from './auth.module';

import AuthDataService from './auth.data.service';

_module.service('AuthDataSrv',AuthDataService);

export default _module; 