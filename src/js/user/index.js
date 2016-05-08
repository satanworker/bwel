import _module from './user.module.js';

_module.service('UserDataSrv', UserService);

function UserService() {
  return {
    name: "Nik"
  };
}

export default _module;
