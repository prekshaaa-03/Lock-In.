const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { 
    type: String, 
    required: true 
  },
  studyDateTime: { 
    type: Date, 
    required: true 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { 
  timestamps: true 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;