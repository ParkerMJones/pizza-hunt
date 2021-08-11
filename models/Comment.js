const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
  {
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});


const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createAtVal => dateFormat(createdAtVal)
  },
  replies: [ReplySchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
