import MockApi from './mock/index';
import SheetBestApi from './sheet-best/index';

let apiModule = MockApi;
if (import.meta.env.PROD) {
    apiModule = SheetBestApi;
}

export default apiModule;