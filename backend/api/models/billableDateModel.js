'use strict';

var mongoose = require('mongoose');

var BillableSchema = new mongoose.Schema({  
  entry_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Entry'},
  start_date:{
    type: String
  },
  end_date:{
    type: String
  }
}, {timestamps: true});

mongoose.model('Billable', BillableSchema);
