import { shape, number, string, arrayOf, oneOf, bool, array } from "prop-types";

//customer
export const customer = shape({
  id: string,
  firstName: string,
  surName: string,
});

//audit detail
export const auditDetail = shape({
  createTime: string,
  updateTime: string,
});

export const document = shape({
  id: string,
  contentType: oneOf(["image/jpg", "application/pdf", "video/mp4"]),
  url: string.isRequired,
});

export const pagination = shape({
  page: number,
  done: bool,
});

//group
export const groupIcon = shape({
  id: string,
  url: string,
});

export const group = shape({
  id: string,
  name: string,
  description: string,
  createdBy: shape({
    id: string,
  }),
  status: oneOf(["ACTIVE", "INACTIVE"]),
  classfication: string,
  icon: groupIcon,
  auditDetail: auditDetail,
  attributes: shape({
    notificationTopic: string,
    membersCount: number,
  }),
  joined: bool,
});

//post
export const stats = shape({
  likes: number,
  comments: number,
  shares: number,
  post: number,
  total: number,
});

export const post = shape({
  id: number,
  group: shape({
    id: string,
  }),
  customer: customer,
  type: oneOf(["POST"]),
  title: string,
  message: string,
  document: document,
  attributes: shape({
    stats: stats,
  }),
  auditDetail: auditDetail,
});

export const comment = shape({
  id: number,
  group: shape({
    id: string,
  }),
  customer: customer,
  type: oneOf(["COMMENT"]),
  message: string,
  parent: shape({
    id: string,
  }),
  document: document,
  attributes: shape({
    stats: stats,
  }),
  auditDetail: auditDetail,
});

export const notification = shape({
  postId: string,
  title: string,
  attributes: stats,
  timestamp: number,
  groupId: string,
  read: bool,
});

//main redux keys
export const allGroups = arrayOf(group);

export const myGroups = arrayOf(group);

export const currentPost = shape({
  post: post,
  comments: arrayOf(comment),
  pagination: pagination,
});

export const currentGroup = shape({
  group: group,
  posts: arrayOf(post),
  pagination: pagination,
});

export const notifications = shape({
  notificationList: arrayOf(notification),
  posts: arrayOf(post),
});
