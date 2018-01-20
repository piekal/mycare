'use strict';

var mongoose = require('mongoose');

var BillableSchema = new mongoose.Schema({  
  entry_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Entry'},
  startDate:{
    type: String
  },
  endDate:{
    type: String
  }
}, {timestamps: true});

mongoose.model('Billable', BillableSchema);