'use strict';

const uuid = require('uuid').v4;
const dynamoose = require('dynamoose');
const friendModel = require('./friends.schema.js');

exports.handler = async (event) => {

  console.log('E', event);

  try {
    const id = event.pathParameters && event.pathParameters.id;

    let data;

    if(id) {
      const list = await friendModel.query('id').eq(id).exec();
      data = list[0];
    } else {
      data = await friendModel.scan().exec();
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (e) {
    return {
      statusCode: 500,
      response: e.message,
    };
  }

};
