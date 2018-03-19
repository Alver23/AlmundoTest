// Models
import BaseController from './BaseController';

// Config
import Constants from '../config/constants';

class MetaController extends BaseController {
  index(req, res) {
		res.json({
			version: Constants.version,
		});
	}
}

export default new MetaController();
