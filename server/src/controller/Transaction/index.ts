import { default as postController } from './postController/index.js';
import { default as getController } from './getController/index.js';
import { default as getOneController } from './getOneController/index.js';

const controller = {
    postController,
    getController,
    getOneController
};

export default controller;
