// Don't silently swallow unhandled rejections
process.on('unhandledRejection', (e) => {
    throw e;
});

// enable the should interface with sinon
// and load chai-as-promised and sinon-chai by default
const sinonChai = require('sinon-chai');
// chai-as-promised v8 is ESM: require() returns a namespace, the plugin is the default export
const chaiAsPromised = require('chai-as-promised').default;
const { should, use } = require('chai');

should();
use(sinonChai);
use(chaiAsPromised);