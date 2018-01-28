'use strict';

var mongoose = require('mongoose');

var ObservationSchema = new mongoose.Schema({
  entry_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Entry'},
  observation_id: {
    type: String
  },
  resource_type:{
    type: String
  },
  patient_id:{
    type: String
  },
  effective_date:{
    type: String
  },
  status:{
    type: String
  }
}, {timestamps: true});

mongoose.model('Observation', ObservationSchema);
