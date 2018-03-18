// Models
import Hotel from '../models/Hotel';

// Controllers
import BaseController from './BaseController';
import User from '../models/User';
import Post from '../models/Post';

// Utils
import { uploads } from '../lib/util';

class HotelController extends BaseController {

  whitelist = [
    'name',
    'address',
    'starts',
    'price',
    'images',
    'amenities',
  ];

  _populate = async (req, res, next) => {
    const { id } = req.params;

    try {
      const hotel = await Hotel.findById(id);

      if (!hotel) {
        const err = new Error('Hotel not found.');
        err.status = 404;
        return next(err);
      }

      req.hotel = hotel;
      next();
    } catch (err) {
      err.status = err.name ==='CastError' ? 404 : 500;
      next(err);
    }
  }

  search = async (req, res, next) => {
    const queryString = (req.query && Object.keys(req.query).length > 0) ? req.query : null;
    let filters = {};
    if (queryString) {
      filters = {
        ...queryString,
      };

      if (filters.name) {
        filters.name = new RegExp(filters.name, 'i');
      }
    }
    try {
      // @TODO Add pagination
      res.json(await Hotel.find(filters));
    } catch(err) {
      next(err);
    }
  }

  /**
   * req.post is populated by middleware in routes.js
   */

  fetch = (req, res) => {
    res.json(req.hotel);
  }

  /**
   * req.user is populated by middleware in routes.js
   */

  create = async (req, res, next) => {
    const params = this.filterParams(req.body, this.whitelist);

    const files = (req.files && req.files.images) ? req.files.images : false;
    let images = [];

    let items = [];
    if (typeof params.amenities == 'string') {
      items = JSON.parse(params.amenities);
    } else {
      items = params.amenities;
    }
    params.amenities = items;

    if (files) {
      images = uploads(files);
    }

    const hotel = new Hotel({
      ...params,
      images,
    });

    try {
      res.status(201).json(await hotel.save());
    } catch(err) {
      next(err);
    }
  }

  update = async (req, res, next) => {
    const newAttributes = this.filterParams(req.body, this.whitelist);
    const updatedHotel = Object.assign({}, req.id, newAttributes);

    try {
      res.status(200).json(await updatedHotel.save());
    } catch (err) {
      next(err);
    }
  }

  delete = async (req, res, next) => {
    if (!req.id) {
      return res.sendStatus(403);
    }

    try {
      await req.id.remove();
      res.sendStatus(204);
    } catch(err) {
      next(err);
    }
  }
}

export default new HotelController();
